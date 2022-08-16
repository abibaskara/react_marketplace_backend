import express from 'express';
import {
    getUsers,
    getUsersById,
    Register,
    updateUser,
    deleteUser,
    Login,
    Logout

} from '../controllers/UserController.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();


router.post('/users', Register);
router.post('/login', Login);
router.post('/token', refreshToken);
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUsersById);
router.delete('/logout', verifyToken, Logout);

router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);



export default router;