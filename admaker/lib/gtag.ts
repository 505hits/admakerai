// Google Analytics tracking functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// ============================================
// CONVERSION EVENTS FOR GOOGLE ADS
// ============================================

/**
 * Track user sign up event
 * Call this when a user successfully signs up/registers
 */
export const trackSignUp = (method: string = 'email') => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'sign_up', {
            method: method,
        });
        console.log('📊 GA Event: sign_up', { method });
    }
};

/**
 * Track begin checkout event
 * Call this when user clicks on a pricing plan to start checkout
 */
export const trackBeginCheckout = ({
    value,
    currency = 'USD',
    planName,
    billingPeriod,
}: {
    value: number;
    currency?: string;
    planName: string;
    billingPeriod: 'monthly' | 'annual';
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout', {
            currency: currency,
            value: value,
            items: [
                {
                    item_id: `plan_${planName.toLowerCase()}_${billingPeriod}`,
                    item_name: `${planName} Plan (${billingPeriod})`,
                    price: value,
                    quantity: 1,
                },
            ],
        });
        console.log('📊 GA Event: begin_checkout', { value, planName, billingPeriod });
    }
};

/**
 * Track purchase/conversion event
 * Call this when payment is successfully completed
 */
export const trackPurchase = ({
    transactionId,
    value,
    currency = 'USD',
    planName,
    billingPeriod,
}: {
    transactionId?: string;
    value: number;
    currency?: string;
    planName: string;
    billingPeriod?: string;
}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
            transaction_id: transactionId || `txn_${Date.now()}`,
            currency: currency,
            value: value,
            items: [
                {
                    item_id: `plan_${planName.toLowerCase()}_${billingPeriod || 'subscription'}`,
                    item_name: `${planName} Plan`,
                    price: value,
                    quantity: 1,
                },
            ],
        });
        console.log('📊 GA Event: purchase', { transactionId, value, planName });
    }
};

/**
 * Track login event
 * Call this when a user logs in
 */
export const trackLogin = (method: string = 'email') => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'login', {
            method: method,
        });
        console.log('📊 GA Event: login', { method });
    }
};
