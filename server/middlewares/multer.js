import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname).toLowerCase();

        const allowedExt = [".jpg", ".jpeg", ".png"];

        if (!allowedExt.includes(ext)) {
            return cb(new Error("Only JPG/PNG allowed"));
        }

        const newName = crypto.randomUUID() + ext;

        cb(null, newName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});