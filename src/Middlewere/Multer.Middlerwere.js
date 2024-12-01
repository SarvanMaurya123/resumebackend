import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/temp'); // Specify the destination where uploaded files will be stored temporarily
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Define the filename for uploaded files
    }
});

const upload = multer({ storage: storage });

export default upload;
