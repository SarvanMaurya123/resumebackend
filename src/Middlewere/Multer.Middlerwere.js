import multer from 'multer';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
        files: 1,                 // Allow only 1 file per request
    },
    fileFilter: (req, file, cb) => {
        // Optional: Restrict file types
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and PDF files are allowed!'), false);
        }
        cb(null, true);
    },
});

export default upload;
