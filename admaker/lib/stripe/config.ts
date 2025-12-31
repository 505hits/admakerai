// Pricing plan configuration - no Stripe initialization to avoid build-time errors
// Stripe instances are created directly in API routes

// Pricing plan configuration
export const PRICING_PLANS = {
    monthly: {
        startup: {
            priceId: 'price_1SkQxK5bursMG9B4FCGIWRvJ',
            amount: 4900, // $49.00 en cents
            videoCredits: 440,
            actorCredits: 440,
            replicatorCredits: 0, // Feature not available
            videos: 22,
        },
        growth: {
            priceId: 'price_1SkQye5bursMG9B4x2BIkv40',
            amount: 6900, // $69.00 en cents
            videoCredits: 1200,
            actorCredits: 1200,
            replicatorCredits: 100, // 5 uses × 20 credits
            videos: 60,
        },
        pro: {
            priceId: 'price_1SkQza5bursMG9B44My58ZIS',
            amount: 9900, // $99.00 en cents
            videoCredits: 2200,
            actorCredits: 2200,
            replicatorCredits: 200, // 10 uses × 20 credits
            videos: 110,
        },
    },
    annual: {
        startup: {
            priceId: 'price_1SkR1f5bursMG9B4pJ4bzp5M',
            amount: 47000, // $470.00 en cents (49 * 12 * 0.8)
            videoCredits: 5280, // 440 * 12
            actorCredits: 5280, // 440 * 12
            replicatorCredits: 0, // Feature not available
            videos: 264, // 22 * 12
        },
        growth: {
            priceId: 'price_1SkR6V5bursMG9B4EC504o4P',
            amount: 66200, // $662.00 en cents (69 * 12 * 0.8)
            videoCredits: 14400, // 1200 * 12
            actorCredits: 14400, // 1200 * 12
            replicatorCredits: 1200, // 100 * 12
            videos: 720, // 60 * 12
        },
        pro: {
            priceId: 'price_1SkR7y5bursMG9B4EbCNFTYP',
            amount: 95000, // $950.00 en cents (99 * 12 * 0.8)
            videoCredits: 26400, // 2200 * 12
            actorCredits: 26400, // 2200 * 12
            replicatorCredits: 2400, // 200 * 12
            videos: 1320, // 110 * 12
        },
    },
} as const;

export type PlanType = 'startup' | 'growth' | 'pro';
export type BillingPeriod = 'monthly' | 'annual';
