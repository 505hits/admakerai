const fs = require('fs');
const path = require('path');

// Fonction pour ajouter ES à IndustryTabs
function updateIndustryTabs() {
    const file = path.join(__dirname, 'admaker', 'components', 'IndustryTabs.tsx');
    let content = fs.readFileSync(file, 'utf8');

    // Update interface
    content = content.replace(
        "lang?: 'en' | 'fr';",
        "lang?: 'en' | 'fr' | 'es';"
    );

    // Add ES translations before closing };
    const esContent = `,
        es: {
            badge: 'Plataforma UGC IA',
            title: 'Perfecto para cada industria',
            industries: [
                {
                    id: 'ecommerce',
                    name: 'E-commerce',
                    title: 'Impulsa tus ventas con videos UGC auténticos',
                    description: 'Crea videos de productos convincentes que conviertan navegadores en compradores',
                    features: ['Demostraciones de productos', 'Testimonios de clientes', 'Videos de unboxing', 'Comparaciones de productos']
                },
                {
                    id: 'saas',
                    name: 'SaaS',
                    title: 'Muestra tu software en acción',
                    description: 'Crea tutoriales atractivos y videos explicativos que simplifiquen características complejas',
                    features: ['Tutoriales de productos', 'Videos de incorporación', 'Actualizaciones de características', 'Historias de éxito de clientes']
                },
                {
                    id: 'agency',
                    name: 'Agencias',
                    title: 'Escala la producción de contenido para clientes',
                    description: 'Produce videos de alta calidad para múltiples clientes sin los costos tradicionales de producción',
                    features: ['Campañas de marca', 'Contenido de redes sociales', 'Anuncios de video', 'Narrativa de marca']
                },
                {
                    id: 'influencer',
                    name: 'Influencer',
                    title: 'Amplifica tu alcance con contenido IA',
                    description: 'Crea contenido consistente y de alta calidad que resuene con tu audiencia',
                    features: ['Contenido diario', 'Colaboraciones de marca', 'Reseñas de productos', 'Vlogs de estilo de vida']
                }
            ]
        }`;

    // Find the closing of content object and add ES before it
    content = content.replace(
        /(\s+)\]\s*\}\s*\n(\s+)\}\s*\n(\s+)\};/,
        `$1]$2}$3}${esContent}$3};`
    );

    // Add fallback
    content = content.replace(
        'const t = content[lang];',
        'const t = content[lang] || content[\'en\'];'
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log('✅ IndustryTabs.tsx updated');
}

// Fonction pour ajouter ES aux autres composants
function updateComponent(componentName, esTranslations) {
    const file = path.join(__dirname, 'admaker', 'components', `${componentName}.tsx`);
    let content = fs.readFileSync(file, 'utf8');

    // Update interface
    content = content.replace(
        "lang?: 'en' | 'fr';",
        "lang?: 'en' | 'fr' | 'es';"
    );

    // Add ES translations
    const esContent = `,\n        es: ${JSON.stringify(esTranslations, null, 12).split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n')}`;

    content = content.replace(
        /(\s+fr:\s*\{[^}]+\})\s*\n(\s+)\};/,
        `$1${esContent}\n$2};`
    );

    // Add fallback
    content = content.replace(
        'const t = content[lang];',
        'const t = content[lang] || content[\'en\'];'
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ ${componentName}.tsx updated`);
}

try {
    console.log('🚀 Adding Spanish translations...\n');

    updateIndustryTabs();

    updateComponent('Pricing', {
        title: 'Elige Tu Plan',
        subtitle: 'Comienza a crear videos UGC IA profesionales en minutos',
        monthly: 'Mensual',
        annual: 'Anual',
        save: 'Ahorra',
        popular: 'Más Popular',
        perMonth: '/mes',
        billedAnnually: 'facturado anualmente',
        getStarted: 'Comenzar',
        loading: 'Cargando...',
        videoCredits: 'créditos de video',
        actorCredits: 'créditos de actor',
        upTo: 'Hasta',
        videosPerMonth: 'videos por mes',
        languages: '35+ idiomas',
        productHolding: 'Sostener producto',
        outfitSwapping: 'Cambio de vestuario',
        replicatorCredits: 'créditos de replicador',
        replications: 'replicaciones'
    });

    updateComponent('FAQ', {
        title: 'Preguntas',
        titleHighlight: 'Frecuentes',
        subtitle: '¿Tienes preguntas? Tenemos respuestas',
        faqs: [
            { question: '¿Qué es AdMaker AI?', answer: 'AdMaker AI es la plataforma líder para crear videos UGC profesionales con actores IA en minutos.' },
            { question: '¿Cómo funciona?', answer: 'Simplemente selecciona un actor IA, escribe tu guión y genera tu video en 2 minutos.' },
            { question: '¿Cuánto cuesta?', answer: 'Ofrecemos planes desde $29/mes con créditos incluidos para videos y actores IA.' }
        ]
    });

    updateComponent('Testimonials', {
        title: 'Lo que dicen',
        titleHighlight: 'nuestros clientes',
        subtitle: 'Únete a miles de creadores que confían en AdMaker AI',
        testimonials: [
            { name: 'María García', role: 'Creadora de Contenido', text: 'AdMaker AI transformó mi creación de contenido. ¡Ahora genero más de 20 videos por semana!' },
            { name: 'Carlos Rodríguez', role: 'Propietario E-commerce', text: 'Los actores IA son increíblemente realistas. ¡Mi engagement aumentó un 300%!' },
            { name: 'Ana Martínez', role: 'Gerente de Marketing', text: 'Mejor inversión para mi negocio. ¡El ROI fue positivo desde el primer mes!' }
        ]
    });

    console.log('\n✨ All components updated!');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
