import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} from '../controllers/user';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

export default router;
