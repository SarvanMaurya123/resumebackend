import Resume3 from "../../Modules/Resume3.module.js"; // Adjust import based on file path

const resume3Create = async (req, res) => {
    const { name, jobTitle, contact, education, skills, languages, profileSummary, workExperience } = req.body;

    // Validate required fields
    if (!name || !jobTitle || !contact) {
        return res.status(400).json({ message: "All fields (name, jobTitle, contact) are required." });
    }

    try {
        // Create a new resume instance
        const resume = new Resume3({
            name,
            jobTitle,
            contact,
            education,
            skills,
            languages,
            profileSummary,
            workExperience
        });

        // Save the resume to the database
        const savedResume = await resume.save();

        // Send a success response
        return res.status(201).json({
            message: "Resume created successfully",
            resume: savedResume
        });
    } catch (error) {
        console.error("Error saving resume:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export { resume3Create };
