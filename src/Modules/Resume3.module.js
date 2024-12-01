import mongoose, { Schema } from 'mongoose';

const resumeSchema = new Schema({
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    contact: {
        phone: { type: String },
        email: { type: String },
        address: { type: String },
        website: { type: String }
    },
    education: [
        {
            institution: { type: String, required: true },
            degree: { type: String, required: true },
            startYear: { type: Number, required: true },
            endYear: { type: Number, required: true },
            gpa: { type: String }
        }
    ],
    skills: [String],
    languages: [
        {
            language: { type: String },
            proficiency: { type: String }
        }
    ],
    profileSummary: { type: String, required: true },
    workExperience: [
        {
            company: { type: String, required: true },
            position: { type: String, required: true },
            startDate: { type: String, required: true },
            endDate: { type: String },
            responsibilities: [String]
        }
    ]
});

const Resume3 = mongoose.model('Resume', resumeSchema);
export default Resume3;
