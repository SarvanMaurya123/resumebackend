import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRATE
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log('No file path provided');
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        fs.unlinkSync(localFilePath); // Delete the local file after successful upload
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if there's an error
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};

export default uploadOnCloudinary;
