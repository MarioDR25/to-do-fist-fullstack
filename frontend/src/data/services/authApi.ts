import { Session } from "@/types/session";
import { UserRequest } from "@/types/user";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const loginApi = async (user: UserRequest): Promise<Session> => {
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( user ),
    });
    if (!response.ok) throw new Error(`Credenciales inválidas ${response.status}`);
    return response.json();
}