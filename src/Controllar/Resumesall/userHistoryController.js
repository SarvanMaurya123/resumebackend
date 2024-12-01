import User from '../../Modules/User.module.js';
import UserHistory from '../../Modules/UserHistory.js';
import { param, validationResult } from 'express-validator';
// Create a history record
const createUserHistory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, action, details } = req.body;
    const historyEntry = new UserHistory({
        userId,
        action,
        details
    });
    try {
        await historyEntry.save();
        res.status(201).send(historyEntry);
    } catch (error) {
        res.status(500).send({ error: 'Error saving user history' });
    }
};
// Get all user history records
const getAllUserHistories = async (req, res) => {
    const userId = req.user.id; // Assuming req.user.id contains the logged-in user's ID
    try {
        const history = await UserHistory.find({ userId });

        if (!history || history.length === 0) {
            return res.status(404).send({ error: 'No history records found for this user.' });
        }

        res.status(200).send(history);

    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
// Get all user history records
const getAllUserIdHistories = async (req, res) => {
    const userId = req.user?.id; // Assuming req.user.id contains the logged-in user's ID (e.g., after authentication middleware)

    if (!userId) {
        return res.status(400).send({ error: 'User ID is required.' });
    }

    try {
        const history = await UserHistory.find({ userId });

        if (!history || history.length === 0) {
            return res.status(404).send({ error: 'No history records found for this user.' });
        }

        res.status(200).send(history);
    } catch (error) {
        console.error('Error fetching user history:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
const updateUserHistory = async (req, res) => {
    const { id } = req.params;  // Resume ID
    const { resume } = req.body; // Updated resume data

    try {
        if (!resume) {
            return res.status(400).json({ error: "Resume data is required for updating." });
        }

        const updatedFields = {};

        // Dynamically check for changes and add to updatedFields
        if (resume.name) updatedFields["details.resume.name"] = resume.name;
        if (resume.jobTitle) updatedFields["details.resume.jobTitle"] = resume.jobTitle;
        if (resume.yourinfo) updatedFields["details.resume.yourinfo"] = resume.yourinfo;

        if (resume.contact?.email) updatedFields["details.resume.contact.email"] = resume.contact.email;
        if (resume.contact?.phone) updatedFields["details.resume.contact.phone"] = resume.contact.phone;
        if (resume.contact?.address) updatedFields["details.resume.contact.address"] = resume.contact.address;
        if (resume.contact?.city) updatedFields["details.resume.contact.city"] = resume.contact.city;
        if (resume.contact?.state) updatedFields["details.resume.contact.state"] = resume.contact.state;
        if (resume.education) updatedFields["details.resume.education"] = resume.education;
        if (resume.experience) updatedFields["details.resume.experience"] = resume.experience;
        if (resume.expertise) updatedFields["details.resume.expertise"] = resume.expertise;
        if (resume.projects) updatedFields["details.resume.projects"] = resume.projects;
        if (resume.languages) updatedFields["details.resume.languages"] = resume.languages;
        if (resume.references) updatedFields["details.resume.references"] = resume.references;
        if (resume.profilePic) updatedFields["details.resume.profilePic"] = resume.profilePic;

        // Update user history document
        const updatedDocument = await UserHistory.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: "Resume not found." });
        }

        // Optionally, update the user with this history if needed
        const user = await User.findById(updatedDocument.userId);
        if (user) {
            user.userHistory = updatedDocument._id;
            await user.save();
        }

        res.status(200).json({ message: "Resume updated successfully.", data: updatedDocument });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the resume.", details: error.message });
    }
};


const deleteUserHistory = async (req, res) => {
    const { id } = req.params;
    // Get the history record ID from the request params
    try {
        const deletedHistory = await UserHistory.findByIdAndDelete(id);
        if (!deletedHistory) {
            logger.warn(`History record with id: ${id} not found`);
            return res.status(404).send({ error: 'History record not found' });
        }
        res.status(200).send({ message: 'History record deleted successfully' });
    } catch (error) {
        console.error("Error:", error);
        logger.error(`Error deleting history record with id: ${id}`, error);
        res.status(500).send({ error: 'Internal server error while deleting record' });
    }
};



export { createUserHistory, getAllUserHistories, updateUserHistory, deleteUserHistory, getAllUserIdHistories };
