import RejectedCookies from '../Modules/RejactedCookie.js'; // Adjust path as necessary
import User from '../Modules/User.module.js'; // Ensure path is correct
import mongoose from 'mongoose'; // Ensure mongoose is imported

const RecordCookieRejection = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch the user to get their email
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a record of rejected cookies
        const rejectedCookies = new RejectedCookies({
            userId: _id,
            email: user.email, // Store the user's email
            reason: 'User rejected all cookies', // Customize if needed
        });

        await rejectedCookies.save();

        // Optionally update the user document
        await User.findByIdAndUpdate(_id, { cookiesAccepted: false });

        res.status(200).json({ message: 'Cookies rejected', rejectedCookies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default RecordCookieRejection;
