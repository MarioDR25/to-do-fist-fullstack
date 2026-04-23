import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/', getAllTasks);
router.post('/add', createTask);
router.put('/modify/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;