const pathData  = path.resolve('data', 'tasks.json')
import path from 'node:path';
import fs from 'node:fs/promises';

import { Task } from '../models/task.model.js';

export async function getTasks(): Promise<Task[]>  {
    const dataJson = await fs.readFile(pathData, 'utf-8')
    return JSON.parse(dataJson) 
}

export async function saveTasks(tasks: Task[]): Promise<void>{
    const stringData = JSON.stringify(tasks, null, 2)
    return fs.writeFile(pathData, stringData);
} 