import User from "../Modules/User.module.js";
import ApiError from "../utiles/ApiError.js";

const generateAccessAndRefreshTokenUser = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong generating Access and Refresh Token");
    }
};

export default generateAccessAndRefreshTokenUser;
