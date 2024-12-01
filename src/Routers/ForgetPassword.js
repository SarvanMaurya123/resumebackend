import express from 'express';
import { requestPasswordReset, resetPassword } from '../Controllar/Resetpassword.js';
const router = express.Router();

// Route to request a password reset
router.post('/forgot-password', requestPasswordReset);

// Route to reset the password (with token)
router.post('/reset-password/:token', resetPassword);

export default router;
