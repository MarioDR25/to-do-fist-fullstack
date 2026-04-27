'use server';
import { revalidatePath } from "next/cache";
import { addTask, deleteTask, updateTask } from "../services/api";
import  { TaskRequest }  from "@/types/task";

export const actionDeleteTask = async (id: number) => {
    try {
        await deleteTask(id);
        revalidatePath('/');
    } catch (error) {
        console.error("Error en action:", error);
    }
}

export const actionAddTask = async (task : TaskRequest) => {
    try {
        await addTask(task)
        revalidatePath('/');
    } catch (error) {
        console.error("Error en action:", error);
    }
}

export const actionUpdateTask = async(id: number, task: TaskRequest) => {
    try {
        await updateTask(id, task)
        revalidatePath('/')
    } catch (error) {
        console.error("Error en action:", error);
    }
}

