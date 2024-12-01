import User from "../Modules/User.module.js";
import ApiError from "../utiles/ApiError.js";
import ApiResponse from "../utiles/ApiResponse.js";
import asyncHandler from "../utiles/asyncHandler.js";

const LogoutUser = asyncHandler(async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        throw new ApiError(401, "User is not authenticated");
    }

    // Find the user in the database
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Clear refresh token and set isActive to false
    user.refreshToken = ""; // or use another method to clear the refresh token
    user.isActive = false; // Set the user as inactive

    // Save the updated user document
    await user.save();

    // Options for clear cookies
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // Ensure secure cookies in production
    };

    // Clear cookies and send response
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully")); // Ensure ApiResponse is structured correctly
});

export default LogoutUser;
