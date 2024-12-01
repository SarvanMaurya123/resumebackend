import User from "../Modules/User.module.js";
import UserHistory from "../Modules/UserHistory.js";
import ApiError from "../utiles/ApiError.js";
import asyncHandler from "../utiles/asyncHandler.js";
import ApiResponse from "../utiles/ApiResponse.js";
import sendWelcomeEmail from "../utiles/Sendmail.js";

const RagisterUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, tel, password, isActive } = req.body;

        if ([name, email, tel, password].some((field) => typeof field !== "string" || String(field).trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const alreadyExistUser = await User.findOne({ $or: [{ name }, { email }] });

        if (alreadyExistUser) {
            throw new ApiError(400, "Name or email already exists. Please try again.");
        }


        // Create the User
        const user = await User.create({
            name: name.toLowerCase(),
            email,
            password,
            tel: String(tel),
            isActive: Boolean(isActive),
        });

        // Create the UserHistory after the user is successfully created
        const userHistory = await UserHistory.create({
            userId: user._id, // Set userId to the created user's _id
            action: 'User Registered',
            details: { name, email },
        });

        // Update the user with the linked userHistory
        user.userHistory = userHistory._id;
        await user.save(); // Save the user with the updated userHistory reference

        // Find the user and exclude sensitive fields
        const createUser = await User.findById(user._id).select("-password -refreshToken");

        // Send a welcome email
        await sendWelcomeEmail(createUser.email, createUser.name);

        if (!createUser) {
            throw new ApiError(500, "Something went wrong creating user");
        }

        return res.status(200).json(new ApiResponse(200, "Registration successful", true, createUser));
    } catch (error) {
        console.error(error);
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || "Internal Server Error", false));
    }
});
export { RagisterUser };


// import User from "../Modules/User.module.js";
// import ApiError from "../utiles/ApiError.js";
// import asyncHandler from "../utiles/asyncHandler.js";
// import ApiResponse from "../utiles/ApiResponse.js";
// import sendWelcomeEmail from "../utiles/Sendmail.js"; // Adjust the path as needed

// const RagisterUser = asyncHandler(async (req, res) => {
//     try {
//         const { name, email, tel, password, isActive } = req.body;

//         if ([name, email, tel, password].some((field) => typeof field !== "string" || String(field).trim() === "")) {
//             throw new ApiError(400, "All fields are required");
//         }

//         const alreadyExistUser = await User.findOne({ $or: [{ name }, { email }] });
//         console.log(alreadyExistUser);
//         if (alreadyExistUser) {
//             throw new ApiError(400, "Name or email already exists. Please try again.");
//         }

//         const user = await User.create({
//             name: name.toLowerCase(),
//             email,
//             password,
//             tel: String(tel),
//             isActive: Boolean(isActive),
//         });
//         console.log(user);

//         const createUser = await User.findById(user._id).select("-password -refreshToken");

//         if (!createUser) {
//             throw new ApiError(500, "Something went wrong creating user");
//         }

//         // Send welcome email
//         await sendWelcomeEmail(createUser.email, createUser.name);

//         return res.status(200).json(new ApiResponse(200, "Registration successful", true, createUser));
//     } catch (error) {
//         return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || "Internal Server Error", false));
//     }
// });

// export { RagisterUser };
