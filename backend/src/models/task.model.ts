import { v4 as uuidv4 } from 'uuid';

export default interface Task {
    id: string;
    date: string;
    title: string;
    description?: string;
    completed: boolean;
    user_id: string;
}

export type CreateTaskDTO = {
    title: string;
    userId: string;
    description?: string;
}

export const createNewTask = (title: string, userId: string, description?: string): Task => {
    return {
        id: uuidv4(),
        date: new Date().toISOString(),
        title,
        completed: false,
        user_id: userId,
        ...(description && { description }),
    };
}