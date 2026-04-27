import { taskDataToTaskDataDto } from "../mappers/taskDataToTaskDataDto";
import { TaskRequestDto, TaskDto } from "../dtos/taskDto";
import { taskDtoToTask } from "../mappers/taskDtoToTask";
import  {TaskRequest, Task}  from "@/types/task";


const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export const getAllTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${BASE_URL}/tasks`)
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)
    }
    const data: TaskDto[] = await response.json()
 
    const tasks: Task[] = data.map(t => taskDtoToTask(t));
    
    return tasks;
} 



export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/tasks/delete/${id}`, {method: 'DELETE'})
    if (!response.ok) {
        throw new Error(`No se pudo ELiminar: ${response.status} ${response.statusText}`)
    }
}


export const addTask = async (task: TaskRequest): Promise<void> => {
    const data: TaskRequestDto = taskDataToTaskDataDto(task)

    const response = await fetch(`${BASE_URL}/tasks/add`, 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data, null, 2)
        } )
    if (!response.ok) {
        throw new Error(`No se pudo Agregar la tarea: ${response.status} ${response.statusText}`)
    }
}



export const updateTask = async (id: number, task: TaskRequest): Promise<void> => {
    const data: TaskRequestDto = taskDataToTaskDataDto(task)

    const response = await fetch(`${BASE_URL}/tasks/modify/${id}`, 
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data, null, 2)
        } )
    if (!response.ok) {
        throw new Error(`No se pudo Actualizar la tarea: ${response.status} ${response.statusText}`)
    }
}