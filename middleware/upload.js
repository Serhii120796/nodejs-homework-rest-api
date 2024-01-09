import multer from "multer";
import path from "path";

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
    cb(null, file.originalname);
    },
    limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
    storage,
});

export default upload;