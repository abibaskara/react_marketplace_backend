import express from 'express';
import {
    createFoto,
    updateFoto,
    deleteFoto,
} from '../controllers/FotoController.js';

const router = express.Router();

router.post('/foto', createFoto);
router.patch('/foto/:id', updateFoto);
router.delete('/foto/:id', deleteFoto);

export default router;