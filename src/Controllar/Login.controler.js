import User from "../Modules/User.module.js";
import ApiError from "../utiles/ApiError.js";
import ApiResponse from "../utiles/ApiResponse.js";
import asyncHandler from "../utiles/asyncHandler.js";
import generateAccessAndRefreshTokenUser from "../utiles/GanratToken.js";

const Login = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    try {
        if (!name && !email) {
            throw new ApiError(400, "name and email are required");
        }

        const user = await User.findOne({ $or: [{ name }, { email }] });

        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            throw new ApiError(400, "Invalid name or password");
        }


        // Set user as active
        user.isActive = true;
        await user.save(); // Save the updated user document

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokenUser(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken, loggedInUser, message: "User has been logged in successfully", success: true }));

    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, error.message || "Internal Server Error", { success: false }));
    }
});

export default Login;
