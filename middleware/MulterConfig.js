const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload directories
const uploadDir = path.join(__dirname, "../uploads");
const imageDir = path.join(uploadDir, "images");
const documentDir = path.join(uploadDir, "documents");

// Create folders if they don’t exist
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};
createFolder(imageDir);
createFolder(documentDir);

console.log("In config fun");


// Allowed file types mapping
const fileTypes = {
    "image/jpeg": "images",
    "image/png": "images",
    "image/gif": "images",
    "application/pdf": "documents",
    "application/msword": "documents",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "documents",
};

// Set file size limit (2MB)
const FILE_SIZE_LIMIT = 2 * 1024 * 1024;

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = fileTypes[file.mimetype];
        if (!folder) {

            console.log("In destination");
            
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Unsupported file type!"));
        }
        cb(null, path.join(uploadDir, folder));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// File filter for validating file types
const fileFilter = (req, file, cb) => {
    if (!fileTypes[file.mimetype]) {
        console.log("In flielilter");
        
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Unsupported file type!"), false);
    }
    cb(null, true);
};

// Multer Upload Middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: FILE_SIZE_LIMIT,
        files: 1,
    },
});

module.exports = upload;
