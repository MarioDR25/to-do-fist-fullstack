import { Request, Response } from 'express';
import Task, { createNewTask } from '../models/task.model.js';
import { readData, writeData } from '../helpers/fileManager.js';
import path from 'node:path';

const taskPath = path.resolve('data', 'tasks.json')

//--------------------------------------------------------------------------------  GETALL  ----------------------------------------------------------------------------------
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await readData<Task>(taskPath);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//--------------------------------------------------------------------------------  CREATE  ----------------------------------------------------------------------------------
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const userId = req.headers['x-user-id'] as string || "default-user";
        if (!title) return res.status(400).json({ message: "Title is required" });
        const tasks: Task[] = await readData<Task>(taskPath);
        const newTask: Task = createNewTask(title, userId, description);
        tasks.push(newTask);
        await writeData<Task>(taskPath, tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//--------------------------------------------------------------------------------  UPDATE  --------------------------------------------------------------------------------
export const updateTask = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const { title, description, completed } = req.body;
        const tasks: Task[] = await readData<Task>(taskPath);
        const taskIndex = tasks.findIndex(t => t.id === idP);
        if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...(title && { title }),
            ...(description !== undefined && { description }),
            ...(completed !== undefined && { completed })
        };
        await writeData<Task>(taskPath, tasks);
        res.status(200).json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//--------------------------------------------------------------------------------  DELETE  --------------------------------------------------------------------------------
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const tasksData = await readData<Task>(taskPath);
        const exist: boolean = tasksData.some(t => t.id === idP);
        if (!exist) return res.status(404).json({ message: "Task does not exist" });
        const tasks: Task[] = tasksData.filter(t => t.id !== idP);
        await writeData<Task>(taskPath, tasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};