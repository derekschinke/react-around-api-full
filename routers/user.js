const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
