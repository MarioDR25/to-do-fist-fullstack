import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, getUserByID } from '../controllers/user.controller.js';
import { validateUser, validateUpdateUser } from '../middleware/user.middleware.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/', validateUser, createUser);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;
