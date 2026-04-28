import { Request, Response } from "express";

import { readData, writeData } from "../helpers/fileManager.js";
import path from "path";
import User, { createNewUser } from "../models/user.model.js";

const usersPath = path.resolve('data', 'users.json')

//--------------------------------------------------------------------------------  GET  ----------------------------------------------------------------------------------
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await readData<User>(usersPath);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const users: User[] = await readData<User>(usersPath);
        const user = users.find(u => u.id === idP);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//--------------------------------------------------------------------------------  CREATE  ----------------------------------------------------------------------------------
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const users: User[] = await readData<User>(usersPath);
        const exists = users.find(u => u.username === username);
        if (exists) return res.status(400).json({ message: "Username already taken" });
        const newUser: User = createNewUser(username, password)
        users.push(newUser);
        await writeData<User>(usersPath, users);
        res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


//--------------------------------------------------------------------------------  UPDATE  --------------------------------------------------------------------------------
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const idP = req.params.id;
        const users: User[] = await readData<User>(usersPath);
        const userIndex = users.findIndex(t => t.id === idP);
        if (userIndex === -1) return res.status(404).json({ message: "User not found" });
        users[userIndex] = { ...users[userIndex], ...(username && { username }), ...(password && { password }) };
        await writeData<User>(usersPath, users);
        res.status(200).json({ id: users[userIndex]?.id, username: users[userIndex]?.username });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


//--------------------------------------------------------------------------------  DELETE  --------------------------------------------------------------------------------
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const usersData = await readData<User>(usersPath);
        const exist: boolean = usersData.some(t => t.id === idP);
        if (!exist) return res.status(404).json({ message: "User does not exist" });
        const users: User[] = usersData.filter(t => t.id !== idP);
        await writeData<User>(usersPath, users);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};