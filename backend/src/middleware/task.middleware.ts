import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, completed } = req.body;

    if (!title || typeof title !== 'string')
        return res.status(400).json({ message: "Title is required and must be text" });

    if (description !== undefined && typeof description !== 'string')
        return res.status(400).json({ message: "Description must be text" });

    if (completed !== undefined)
        return res.status(400).json({ message: "Completed cannot be set on creation" });

    return next();
}

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, completed, id, user_id, date } = req.body;

    if (id || user_id || date)
        return res.status(400).json({ message: "Cannot modify id, user_id or date" });

    if (title !== undefined && (typeof title !== 'string' || !title))
        return res.status(400).json({ message: "Title must be a non-empty string" });

    if (description !== undefined && typeof description !== 'string')
        return res.status(400).json({ message: "Description must be text" });

    if (completed !== undefined && typeof completed !== 'boolean')
        return res.status(400).json({ message: "Completed must be a boolean" });

    return next();
}