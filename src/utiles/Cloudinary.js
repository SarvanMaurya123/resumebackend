

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRATE,
});

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {String} fileName - A unique file name (optional)
 * @returns {Promise<Object>} Cloudinary response
 */
const uploadOnCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: fileName || undefined },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(new Error(`Failed to upload image to Cloudinary: ${error.message}`));
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};


export default uploadOnCloudinary;
