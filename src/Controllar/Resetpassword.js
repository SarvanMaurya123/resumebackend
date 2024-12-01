import User from "../Modules/User.module.js";
import ApiError from "../utiles/ApiError.js";
import asyncHandler from "../utiles/asyncHandler.js";
import ApiResponse from "../utiles/ApiResponse.js";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import sendResetEmail from "../utiles/Sendmailforgetpassword.js";
// Controller to handle password reset request
const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json(new ApiResponse(400, 'Email is required', false));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json(new ApiResponse(404, 'User not found', false));
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    try {
        await sendResetEmail(user.email, resetToken);
    } catch (emailError) {
        console.error('Error sending reset email:', emailError);
        return res.status(500).json(new ApiResponse(500, 'Failed to send reset email', false));
    }

    return res.status(200).json(new ApiResponse(200, 'Password reset email sent', true));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    console.log("Token received:", token);
    console.log("Password received:", password);
    console.log("Confirm Password received:", confirmPassword);

    if (typeof token !== 'string' || token.trim() === '' ||
        typeof password !== 'string' || password.trim() === '' ||
        typeof confirmPassword !== 'string' || confirmPassword.trim() === '') {
        return res.status(400).json(new ApiResponse(400, 'Token, new password, and confirmation password are required', false));
    }

    if (password !== confirmPassword) {
        return res.status(400).json(new ApiResponse(400, 'Passwords do not match', false));
    }

    // const user = await User.findOne({
    //     resetPasswordToken: token.trim(),
    //     resetPasswordExpires: { $gt: Date.now() }
    // });

    // Log the query being used
    const query = {
        resetPasswordToken: token.trim(),
        resetPasswordExpires: { $gt: Date.now() }
    };

    console.log("Query used to find user:", query);

    const user = await User.findOne(query);

    console.log("User found with token:", user);

    if (!user) {
        return res.status(400).json(new ApiResponse(400, 'Password reset token is invalid or has expired', false));
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json(new ApiResponse(200, 'Password has been reset successfully', true));
});

export { requestPasswordReset, resetPassword };