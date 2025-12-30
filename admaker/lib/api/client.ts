// Secure Fetch Client
// Wrapper around fetch() that automatically includes CSRF token

/**
 * Get CSRF token from cookies
 */
function getCsrfToken(): string | null {
    if (typeof document === 'undefined') {
        return null;
    }

    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];

    return cookieValue || null;
}

/**
 * Secure fetch wrapper that includes CSRF token
 * Use this instead of fetch() for all API calls
 */
export async function secureFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const csrfToken = getCsrfToken();

    const headers = new Headers(options.headers);

    // Add CSRF token if available
    if (csrfToken) {
        headers.set('x-csrf-token', csrfToken);
    }

    // Add Content-Type if not set and body is JSON
    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    return fetch(url, {
        ...options,
        headers,
    });
}

/**
 * Secure fetch with JSON response
 */
export async function secureFetchJson<T = any>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await secureFetch(url, options);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}
