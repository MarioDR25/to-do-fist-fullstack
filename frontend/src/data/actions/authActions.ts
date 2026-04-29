'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginApi } from '../services/authApi';
import { createUser } from '../services/userApi';
import { UserRequest } from '@/types/user';

export const actionLogin = async (username: string, password: string) => {
    try {
        const session = await loginApi(username, password);
        const cookieStore = await cookies();
        cookieStore.set('session', JSON.stringify(session), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 días
        });
    } catch (error) {
        return { success: false, error: 'Credenciales inválidas' };
    }
    redirect('/');
}

export const actionRegister = async (user: UserRequest) => {
    try {
        const newUser = await createUser(user);
        const cookieStore = await cookies();
        cookieStore.set('session', JSON.stringify(newUser), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
    } catch (error: any) {
        return { success: false, error: error.message || 'Error al registrar' };
    }
    redirect('/');
}

export const actionLogout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/');
}