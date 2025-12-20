import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export const getStripe = () => {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('Missing STRIPE_SECRET_KEY environment variable');
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia',
            typescript: true,
        });
    }
    return stripeInstance;
};

// Pricing plan configuration
export const PRICING_PLANS = {
    monthly: {
        startup: {
            priceId: 'price_1SgSCd8qryufLdqNCLVW6KSL',
            amount: 4900, // $49.00 en cents
            videoCredits: 440,
            actorCredits: 440,
            videos: 22,
        },
        growth: {
            priceId: 'price_1SgSG58qryufLdqNcicPIyQO',
            amount: 6900, // $69.00 en cents
            videoCredits: 1200,
            actorCredits: 1200,
            videos: 60,
        },
        pro: {
            priceId: 'price_1SgSJF8qryufLdqNjveEtHjg',
            amount: 9900, // $99.00 en cents
            videoCredits: 2200,
            actorCredits: 2200,
            videos: 110,
        },
    },
    annual: {
        startup: {
            priceId: 'price_1SgSE98qryufLdqNZbAQQB42',
            amount: 47040, // $470.40 en cents (39.20 * 12)
            videoCredits: 5280,
            actorCredits: 5280,
            videos: 264,
        },
        growth: {
            priceId: 'price_1SgSHn8qryufLdqNYiDKKrue',
            amount: 66240, // $662.40 en cents (55.20 * 12)
            videoCredits: 14400,
            actorCredits: 14400,
            videos: 720,
        },
        pro: {
            priceId: 'price_1SgSMQ8qryufLdqNzVXOeYRC',
            amount: 95040, // $950.40 en cents (79.20 * 12)
            videoCredits: 26400,
            actorCredits: 26400,
            videos: 1320,
        },
    },
} as const;

export type PlanType = 'startup' | 'growth' | 'pro';
export type BillingPeriod = 'monthly' | 'annual';
