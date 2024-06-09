import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        console.log("inside file name", file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // File ko extension extract gareko 
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

export default upload;