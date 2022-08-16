import express from 'express';
import {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee

} from '../controllers/EmployeeController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/employee', verifyToken, getEmployee);
router.get('/employee/:id', verifyToken, getEmployeeById);
router.post('/employee', verifyToken, createEmployee);

router.patch('/employee/:id', verifyToken, updateEmployee);
router.delete('/employee/:id', verifyToken, deleteEmployee);

export default router;