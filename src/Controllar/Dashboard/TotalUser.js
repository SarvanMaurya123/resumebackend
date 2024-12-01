import User from "../../Modules/User.module.js";
import ApiError from '../../utiles/ApiError.js';

const totalUser = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({ totalUsers: userCount });
    } catch (err) {
        // Handle error properly and send a response
        const apiError = new ApiError(500, 'Error fetching user count', err);
        res.status(apiError.statusCode).json({ message: apiError.message, error: apiError.error });
    }
};

export default totalUser;
