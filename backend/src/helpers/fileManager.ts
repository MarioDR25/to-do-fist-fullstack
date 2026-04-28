import fs from 'node:fs/promises';

export async function readData<T>(path: string): Promise<T[]> {
    try {
        const dataJson = await fs.readFile(path, 'utf-8');
        try {
            return JSON.parse(dataJson);
        } catch {
            throw new Error(`Corrupted JSON at: ${path}`);
        }
    } catch (error: any) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function writeData<T>(path: string, data: T[]): Promise<void> {
    const stringData = JSON.stringify(data, null, 2);
    await fs.writeFile(path, stringData);
}