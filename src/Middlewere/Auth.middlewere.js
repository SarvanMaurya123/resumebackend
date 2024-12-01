import jwt from 'jsonwebtoken';
import User from '../Modules/User.module.js';
import asyncHandler from '../utiles/asyncHandler.js';
import ApiError from '../utiles/ApiError.js';

const verifyUserJWT = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken;

        if (!token) {
            token = req.header('Authorization')?.replace('Bearer ', '');
        }

        if (!token) {

            throw new ApiError(401, 'Unauthorized: Missing accessToken');
        }


        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Token Not Found");
        }

        const user = await User.findById(decodedToken._id).select('-password -refreshToken');

        if (!user) {
            throw new ApiError(401, 'Unauthorized: Invalid accessToken');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Unauthorized: AccessToken expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, 'Unauthorized: Invalid accessToken');
        } else {
            throw new ApiError(401, 'Unauthorized: Invalid accessToken');
        }
    }
});

export default verifyUserJWT;
