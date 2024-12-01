import mongoose from 'mongoose';
import UserHistory from '../Modules/UserHistory.js'; // Import the UserHistory model
import User from './User.module.js';

const experienceSchema = new mongoose.Schema({
    duration: {
        type: String,
    },
    companyName: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    },
    jobDescription: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,

    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    address: String,
    city: String,
    state: String
});

const educationSchema = new mongoose.Schema({
    year: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear()
    },
    degree: {
        type: String,
        trim: true
    },
    university: {
        type: String,
        trim: true
    },
    city: String,
    state: String
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: {
        type: String,

        trim: true
    },
    description: String
}, { timestamps: true });

const expertiseSchema = new mongoose.Schema({
    skills: {
        type: [String],
    }
}, { timestamps: true });

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    },
    yourinfo: {
        type: String,
        trim: true
    },
    contact: contactSchema,
    education: [educationSchema],
    experience: [experienceSchema],
    expertise: expertiseSchema,
    projects: [projectSchema],
}, { timestamps: true });

// Middleware to create history record before saving a document
profileSchema.pre('save', async function (next) {
    if (this.isNew || !this.isModified()) return next();

    try {
        const historyEntry = {
            userId: this._id,
            action: 'updated_profile',
            details: this.toObject()
        };

        const user = await User.findById(this._id);
        if (user) {
            if (user.userHistory) {
                await UserHistory.findByIdAndUpdate(user.userHistory, historyEntry, { new: true });
            } else {
                const newHistory = await UserHistory.create(historyEntry);
                user.userHistory = newHistory._id;
                await user.save();
            }
        }
    } catch (error) {
        console.error('Error creating or updating user history:', error);
    }

    next();
});


const Resume2 = mongoose.model('Resume2', profileSchema);

export default Resume2;

