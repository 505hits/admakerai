// Environment Variables Validation
// Validates required environment variables at startup

const REQUIRED_ENV_VARS = [
    // Supabase
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',

    // Stripe
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',

    // Cloudflare R2
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',

    // API Keys
    'REPLICATE_API_TOKEN',
    'KIE_API_KEY',
];

const OPTIONAL_ENV_VARS = [
    'NEXT_PUBLIC_APP_URL',
    'TURNSTILE_SECRET_KEY',
    'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
];

const WEBHOOK_SECRETS = [
    'REPLICATE_WEBHOOK_SECRET',
    'KIE_WEBHOOK_SECRET',
    'NANO_BANANA_WEBHOOK_SECRET',
    'VEO_WEBHOOK_SECRET',
];

/**
 * Validate all required environment variables
 * @throws Error if required variables are missing
 */
export function validateRequiredEnvVars(): void {
    const missing: string[] = [];

    for (const varName of REQUIRED_ENV_VARS) {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `❌ Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\nPlease add these to your .env.local file or Vercel environment variables.`
        );
    }

    console.log('✅ All required environment variables are present');
}

/**
 * Check webhook secrets and warn if missing
 */
export function checkWebhookSecrets(): void {
    const missing: string[] = [];

    for (const varName of WEBHOOK_SECRETS) {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    }

    if (missing.length > 0) {
        console.warn(
            `⚠️ Missing webhook secrets (webhooks will be less secure):\n${missing.map(v => `  - ${v}`).join('\n')}\n\nGenerate secrets with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
        );
    } else {
        console.log('✅ All webhook secrets are configured');
    }
}

/**
 * Check optional environment variables
 */
export function checkOptionalEnvVars(): void {
    const missing: string[] = [];

    for (const varName of OPTIONAL_ENV_VARS) {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    }

    if (missing.length > 0) {
        console.log(
            `ℹ️ Optional environment variables not set:\n${missing.map(v => `  - ${v}`).join('\n')}`
        );
    }
}

/**
 * Run all environment validation checks
 */
export function validateEnvironment(): void {
    console.log('\n🔍 Validating environment variables...\n');

    try {
        validateRequiredEnvVars();
        checkWebhookSecrets();
        checkOptionalEnvVars();

        console.log('\n✅ Environment validation complete\n');
    } catch (error) {
        console.error('\n❌ Environment validation failed\n');
        throw error;
    }
}
