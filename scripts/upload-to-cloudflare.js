// Script de migration automatisé pour uploader tous les médias vers Cloudflare R2
// Usage: node scripts/upload-to-cloudflare.js
// Note: Ce script utilise l'API S3 native via fetch pour éviter les dépendances

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Configuration pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement manuellement
const envPath = path.join(__dirname, '..', 'admaker', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
        env[match[1].trim()] = match[2].trim();
    }
});

// Configuration Cloudflare R2
const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = env.CLOUDFLARE_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = env.CLOUDFLARE_SECRET_ACCESS_KEY;
const BUCKET_NAME = env.CLOUDFLARE_BUCKET_NAME;
const PUBLIC_URL = env.CLOUDFLARE_PUBLIC_URL;

// Validation des credentials
if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME || !PUBLIC_URL) {
    console.error('❌ Erreur: Variables d\'environnement manquantes dans .env.local');
    console.error('Assurez-vous d\'avoir défini:');
    console.error('  - CLOUDFLARE_ACCOUNT_ID');
    console.error('  - CLOUDFLARE_ACCESS_KEY_ID');
    console.error('  - CLOUDFLARE_SECRET_ACCESS_KEY');
    console.error('  - CLOUDFLARE_BUCKET_NAME');
    console.error('  - CLOUDFLARE_PUBLIC_URL');
    process.exit(1);
}

const ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Dossier source des médias
const PUBLIC_DIR = path.join(__dirname, '..', 'admaker', 'public');

// Fonction pour obtenir le type MIME
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

// Fonction pour créer la signature AWS v4
function createSignature(method, path, headers, payload) {
    const date = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const dateStamp = date.substr(0, 8);

    const canonicalHeaders = Object.keys(headers)
        .sort()
        .map(key => `${key.toLowerCase()}:${headers[key]}`)
        .join('\n');

    const signedHeaders = Object.keys(headers)
        .sort()
        .map(key => key.toLowerCase())
        .join(';');

    const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');

    const canonicalRequest = [
        method,
        path,
        '',
        canonicalHeaders,
        '',
        signedHeaders,
        payloadHash
    ].join('\n');

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
    const canonicalRequestHash = crypto.createHash('sha256').update(canonicalRequest).digest('hex');

    const stringToSign = [
        algorithm,
        date,
        credentialScope,
        canonicalRequestHash
    ].join('\n');

    const kDate = crypto.createHmac('sha256', `AWS4${SECRET_ACCESS_KEY}`).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update('auto').digest();
    const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');

    return {
        authorization: `${algorithm} Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
        date: date
    };
}

// Fonction pour uploader un fichier
async function uploadFile(localPath, remotePath) {
    try {
        const fileContent = fs.readFileSync(localPath);
        const mimeType = getMimeType(localPath);

        const url = `${ENDPOINT}/${BUCKET_NAME}/${remotePath}`;
        const headers = {
            'Host': `${ACCOUNT_ID}.r2.cloudflarestorage.com`,
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000',
        };

        const { authorization, date } = createSignature('PUT', `/${BUCKET_NAME}/${remotePath}`, headers, fileContent);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                ...headers,
                'Authorization': authorization,
                'X-Amz-Date': date,
                'X-Amz-Content-Sha256': crypto.createHash('sha256').update(fileContent).digest('hex'),
            },
            body: fileContent,
        });

        if (response.ok) {
            const publicUrl = `${PUBLIC_URL}/${remotePath}`;
            console.log(`✅ Uploadé: ${remotePath}`);
            return { localPath, remotePath, publicUrl, success: true };
        } else {
            const error = await response.text();
            console.error(`❌ Erreur upload ${remotePath}: ${response.status} - ${error}`);
            return { localPath, remotePath, error: `${response.status}: ${error}`, success: false };
        }
    } catch (error) {
        console.error(`❌ Erreur upload ${remotePath}:`, error.message);
        return { localPath, remotePath, error: error.message, success: false };
    }
}

// Fonction pour scanner récursivement les fichiers
function scanDirectory(dir, baseDir = dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Ignorer certains dossiers
            if (item === 'data' || item === 'node_modules') continue;
            files.push(...scanDirectory(fullPath, baseDir));
        } else if (stat.isFile()) {
            // Filtrer les fichiers médias
            const ext = path.extname(item).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm'].includes(ext)) {
                const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
                files.push({ localPath: fullPath, relativePath });
            }
        }
    }

    return files;
}

// Fonction principale
async function main() {
    console.log('🚀 Début de la migration vers Cloudflare R2\n');
    console.log(`📁 Dossier source: ${PUBLIC_DIR}`);
    console.log(`☁️  Bucket R2: ${BUCKET_NAME}`);
    console.log(`🌐 URL publique: ${PUBLIC_URL}\n`);

    // Scanner les fichiers
    console.log('📊 Scan des fichiers médias...');
    const files = scanDirectory(PUBLIC_DIR);
    console.log(`✅ ${files.length} fichiers trouvés\n`);

    // Upload des fichiers
    console.log('⬆️  Upload en cours...\n');
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const result = await uploadFile(file.localPath, file.relativePath);
        results.push(result);
        if (result.success) {
            successCount++;
        } else {
            errorCount++;
        }
    }

    // Générer le fichier de mapping
    console.log('\n📝 Génération du fichier de mapping...');
    const mapping = {};
    for (const result of results) {
        if (result.success) {
            mapping[`/${result.remotePath}`] = result.publicUrl;
        }
    }

    const mappingPath = path.join(__dirname, '..', 'admaker', 'lib', 'media-urls.json');
    fs.mkdirSync(path.dirname(mappingPath), { recursive: true });
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    console.log(`✅ Mapping sauvegardé: ${mappingPath}\n`);

    // Résumé
    console.log('═══════════════════════════════════════');
    console.log('📊 RÉSUMÉ DE LA MIGRATION');
    console.log('═══════════════════════════════════════');
    console.log(`✅ Succès: ${successCount} fichiers`);
    console.log(`❌ Erreurs: ${errorCount} fichiers`);
    console.log(`📦 Total: ${files.length} fichiers`);
    console.log('═══════════════════════════════════════\n');

    if (errorCount > 0) {
        console.log('⚠️  Certains fichiers n\'ont pas pu être uploadés. Vérifiez les erreurs ci-dessus.');
    } else {
        console.log('🎉 Migration terminée avec succès !');
        console.log('\n📋 Prochaines étapes:');
        console.log('  1. Vérifiez que les URLs fonctionnent en ouvrant quelques-unes dans votre navigateur');
        console.log('  2. Je vais maintenant mettre à jour votre code pour utiliser les nouvelles URLs');
    }
}

// Exécution
main().catch(console.error);
