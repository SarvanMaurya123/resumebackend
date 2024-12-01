import User from "../../Modules/User.module.js";
import asyncHandler from "../../utiles/asyncHandler.js";
import ApiResponse from "../../utiles/ApiResponse.js";

const ActiveUser = asyncHandler(async (req, res) => {
    try {
        // Get the count of total users
        const totalUsers = await User.countDocuments();

        // Get the count of active users
        const activeUsers = await User.countDocuments({ isActive: true });

        // Calculate inactive users
        const inactiveUsers = totalUsers - activeUsers;

        // Send the response with user statistics
        res.status(200).json(new ApiResponse(200, {
            totalUsers,
            activeUsers,
            inactiveUsers
        }, "User statistics retrieved successfully", true)); // Ensure success is true

    } catch (error) {
        // Handle any errors that occurred during the process
        res.status(500).json(new ApiResponse(500, null, "Failed to retrieve user statistics", false));
    }
});

export default ActiveUser;
