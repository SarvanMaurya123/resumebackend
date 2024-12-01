import mongoose from 'mongoose';
import Resume2 from '../../Modules/Resume2.module.js';

const resumeTwoCreate = async (req, res) => {

    const { name, jobTitle, yourinfo, contact, education, experience, expertise, projects } = req.body;

    if (!name || !jobTitle || !contact || !education || !experience || !expertise || !projects) {
        return res.status(400).send({ message: 'All fields are required!' });
    }
    const resume = new Resume2({
        userId: req.user._id,
        name,
        jobTitle,
        yourinfo,
        contact,
        education,
        experience,
        expertise,
        projects,
    });
    try {
        await resume.save(); // Save the new resume to the database
        res.status(201).send(resume); // Return the created resume
    } catch (error) {
        res.status(400).send(error); // Handle validation or other errors
    }
};


// Get All Profiles
const getProfiles = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send('Unauthorized');
        }
        const resumes = await Resume2.find(); // Get all resumes
        res.send(resumes);
    } catch (error) {
        res.status(500).send(error); // Handle server error
    }
};

// Delete Profile
const deleteProfile = async (req, res) => {
    try {
        const resume = await Resume2.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).send('Resume not found'); // Ensure to send a meaningful response
        }
        res.send(resume); // Return the deleted resume
    } catch (error) {
        res.status(500).send(error); // Handle server error
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Resume ID format' });
    }

    try {
        const resume = await Resume2.findOne({ _id: id });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        if (String(resume.userId) !== String(userId)) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Ensure that we only update fields that are not empty
        const updateData = {};

        // Update basic fields
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.jobTitle) updateData.jobTitle = req.body.jobTitle;
        if (req.body.yourinfo) updateData.yourinfo = req.body.yourinfo;

        // Update contact fields only if provided
        if (req.body.contact) {
            if (req.body.contact.phone) updateData['contact.phone'] = req.body.contact.phone;
            if (req.body.contact.email) updateData['contact.email'] = req.body.contact.email;
            if (req.body.contact.address) updateData['contact.address'] = req.body.contact.address;
            if (req.body.contact.city) updateData['contact.city'] = req.body.contact.city;
            if (req.body.contact.state) updateData['contact.state'] = req.body.contact.state;
        }

        // Use $set to update only the fields that were changed
        const updatedResume = await Resume2.findOneAndUpdate(
            { _id: id, userId: userId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ error: 'Failed to update resume' });
        }

        res.status(200).json(updatedResume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
export { resumeTwoCreate, getProfiles, deleteProfile, updateProfile };
