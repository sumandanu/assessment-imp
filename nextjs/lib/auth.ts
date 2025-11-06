import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TOKEN_KEY = 'auth_token';

export const setToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_KEY, token, {
        path: '/',
        domain: 'localhost',
        maxAge: 300,
        httpOnly: true,
        secure: false,
    });
};

export const getToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_KEY);
};

export const removeToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_KEY);
    // cookieStore.set(TOKEN_KEY, '', { maxAge: -1 });
    // return redirect('/signin');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
