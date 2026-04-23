import { Request, Response } from 'express';
import { Task } from '../models/task.model.js';
import { getTasks, saveTasks } from '../helpers/fileManager.js';



//--------------------------------------------------------------------------------  GETALL  --------------------------------------------------------------------------------
export const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await getTasks();
    res.status(200).json(tasks);
};



//--------------------------------------------------------------------------------  CREATE  --------------------------------------------------------------------------------
export const createTask = async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
        return res.status(400).json({ message: "Title and description must be text" });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: "Completed must be a boolean (true/false)" });
    }

    const tasks: Task[] = await getTasks();
    const task: Task = {
        id: Date.now(),
        date: new Date(),
        title,
        description,
        completed
    };
    tasks.push(task);
    await saveTasks(tasks);
    res.status(201).json(task);
};



//--------------------------------------------------------------------------------  UPDATE  --------------------------------------------------------------------------------
export const updateTask = async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;
    const idP = Number(req.params.id);

    if (isNaN(idP)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    const tasks: Task[] = await getTasks();
    const taskIndex = tasks.findIndex(t => t.id === idP);

    if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

    if (title && typeof title !== 'string') {
        return res.status(400).json({ message: "Title must be a string" });
    }

    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: "Description must be a string" });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: "Completed must be a boolean" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, id: idP };
    
    await saveTasks(tasks);
    res.status(200).json(tasks[taskIndex]);
};



//--------------------------------------------------------------------------------  DELETE  --------------------------------------------------------------------------------
export const deleteTask = async (req: Request, res: Response) => {
    const idP = Number(req.params.id);
    
    if (isNaN(idP)) res.status(400).json({ message: "Invalid ID format" }); 
    const tasksData = await getTasks();

    const exist: boolean = tasksData.some(t => t.id === idP);
    if (!exist) {
        return res.status(404).json({ message: "Task does not exist" });
    }
    const tasks: Task[] = tasksData.filter(t => t.id !== idP);
    await saveTasks(tasks);
    res.status(200).json({ message: "deleted task" });
};