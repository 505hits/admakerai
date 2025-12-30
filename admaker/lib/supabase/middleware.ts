import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Helper function to extract language prefix from pathname
    const getLanguagePrefix = (pathname: string): string | null => {
        const supportedLanguages = ['fr', 'es', 'pt', 'ko', 'de', 'ja']
        for (const lang of supportedLanguages) {
            if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
                return lang
            }
        }
        return null
    }

    // Helper function to normalize localized route names to English equivalents
    const normalizeLocalizedPath = (pathname: string): string => {
        const lang = getLanguagePrefix(pathname)
        if (!lang) return pathname

        // Remove language prefix
        const pathWithoutLang = pathname.substring(lang.length + 1) || '/'

        // Map localized route names to English equivalents
        const routeMappings: { [key: string]: string } = {
            '/connexion': '/login',
            '/iniciar-sesion': '/login',
            '/conexao': '/login',
            '/anmelden': '/login',
            '/tableau-de-bord': '/dashboard',
            '/panel': '/dashboard',
            '/painel': '/dashboard',
            '/profil': '/profile',
            '/perfil': '/profile',
            '/paiement': '/payment',
            '/pago': '/payment',
            '/pagamento': '/payment',
            '/zahlung': '/payment',
        }

        return routeMappings[pathWithoutLang] || pathWithoutLang
    }

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/auth', '/dashboard', '/blog']

    // Normalize the pathname to check against public routes
    const normalizedPath = normalizeLocalizedPath(request.nextUrl.pathname)
    const isPublicRoute = publicRoutes.some(route =>
        normalizedPath === route || normalizedPath.startsWith(route + '/')
    )

    if (!user && !isPublicRoute) {
        // no user, redirect to login page with language consideration
        const url = request.nextUrl.clone()
        const lang = getLanguagePrefix(request.nextUrl.pathname)

        // Redirect to localized login page if on a localized route
        if (lang) {
            const loginPaths: { [key: string]: string } = {
                'fr': '/fr/connexion',
                'es': '/es/iniciar-sesion',
                'pt': '/pt/conexao',
                'ko': '/ko/login',
                'de': '/de/anmelden',
                'ja': '/ja/login',
            }
            url.pathname = loginPaths[lang] || '/login'
        } else {
            url.pathname = '/login'
        }

        return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}
