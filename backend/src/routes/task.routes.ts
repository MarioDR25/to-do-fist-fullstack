import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { validateTask, validateUpdateTask } from '../middleware/task.middleware.js';

const router = Router();

router.get('/', getAllTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;
