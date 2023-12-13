import express from 'express';
import { createQuiz, deleteQuiz, getQuiz, getQuizzes, updateQuiz } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createQuiz);
router.delete('/delete/:id', verifyToken, deleteQuiz);
router.post('/update/:id', verifyToken, updateQuiz);
router.get('/get/:id', getQuiz);
router.get('/get', getQuizzes);

export default router;