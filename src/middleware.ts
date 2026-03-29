import { NextRequest, NextResponse } from "next/server"

const REFRESH_TOKEN_COOKIE = 'refreshToken'

const PUBLIC_ROUTES = ['/login', '/register']
const PROTECTED_ROUTES = ['/']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hasSession = !!request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    console.log('pathname:', pathname)
    console.log('refreshToken:', request.cookies.get(REFRESH_TOKEN_COOKIE)?.value)
    console.log('hasSession:', hasSession)

    const isPublic = PUBLIC_ROUTES.includes(pathname)

    // Авторизован → идёт на публичный роут (логин)
    if (hasSession && isPublic) {
        const next = request.nextUrl.searchParams.get('next')
        if (next?.startsWith('/')) {
            return NextResponse.redirect(new URL(next, request.url))
        }

        const url = new URL('/', request.url)
        url.searchParams.set('reason', 'isAuthorized')
        return NextResponse.redirect(url)
    }

    // Не авторизован → идёт на защищённый роут
    if (!hasSession && !isPublic) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('next', pathname)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/).*)',
    ],
}