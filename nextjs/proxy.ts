import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    const publicPaths = ['/signin', '/signup'];

    if (!token && pathname !== '/signin') {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    if (publicPaths.includes(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/signin', '/'],
};
