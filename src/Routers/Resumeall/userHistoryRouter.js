// userHistoryRouter.js

import express from 'express';
import {
    createUserHistory,
    deleteUserHistory,
    getAllUserHistories,
    updateUserHistory,
    getAllUserIdHistories
} from '../../Controllar/Resumesall/userHistoryController.js'; // Adjust the path as needed
import verifyUserJWT from '../../Middlewere/Auth.middlewere.js';
import { body } from 'express-validator';

const router = express.Router();

// Route to create a history record
router.post('/userHistory/save', verifyUserJWT, [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('action').notEmpty().withMessage('Action is required')
], createUserHistory);

router.get('/userHistory/get/', verifyUserJWT, getAllUserHistories);
router.get('/userHistory/get/:id', verifyUserJWT, getAllUserIdHistories);
router.put('/userHistory/update/:id', verifyUserJWT, updateUserHistory);
router.delete('/userHistory/delete/:id', verifyUserJWT, deleteUserHistory);
export default router;
