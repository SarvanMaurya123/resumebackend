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

const referenceSchema = new mongoose.Schema({
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
    company: {
        type: String,
        trim: true
    },
    phone: String,
    email: {
        type: String,
        trim: true,
        lowercase: true
    }
}, { timestamps: true });

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

const expertiseSchema = new mongoose.Schema({
    skills: {
        type: [String],
    }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: {
        type: String,

        trim: true
    },
    description: String
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
    languages: {
        type: [String],
        default: []
    },
    references: [referenceSchema],
    profilePic: String
}, { timestamps: true });



const Resume1 = mongoose.model('Resume1', profileSchema);

export default Resume1;

