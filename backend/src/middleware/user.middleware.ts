import { Request, Response, NextFunction } from 'express';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, id, createdAt } = req.body;

    if (!username || typeof username !== 'string')
        return res.status(400).json({ message: "Username is required and must be text" });

    if (!password || typeof password !== 'string')
        return res.status(400).json({ message: "Password is required and must be text" });

    if (id || createdAt)
        return res.status(400).json({ message: "Cannot set id or createdAt manually" });

    return next();
}

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, id, createdAt } = req.body;

    if (id || createdAt)
        return res.status(400).json({ message: "Cannot modify id or createdAt" });

    if (username !== undefined && (typeof username !== 'string' || !username))
        return res.status(400).json({ message: "Username must be a non-empty string" });

    if (password !== undefined && (typeof password !== 'string' || !password))
        return res.status(400).json({ message: "Password must be a non-empty string" });

    if (username === undefined && password === undefined)
        return res.status(400).json({ message: "At least one field required to update" });

    return next();
}