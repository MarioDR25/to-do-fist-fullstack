import { cookies } from 'next/headers';
import { Session } from '@/types/session';

export const getSession = async (): Promise<Session | null> => {
    const cookieStore = await cookies();
    const raw = cookieStore.get('session');
    if (!raw) return null;
    try {
        return JSON.parse(raw.value) as Session;
    } catch {
        return null;
    }
}