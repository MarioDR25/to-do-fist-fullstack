import { Session } from "@/types/session";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const loginApi = async (username: string, password: string): Promise<Session> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Credenciales inválidas');
    return response.json();
}