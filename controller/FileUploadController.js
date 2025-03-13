const multer = require("multer");

const FileUploadController = (req, res) => {
    console.log("in controller fun");
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded!" });
    }

    return res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        file: req.file.filename,
    });
};

// Error Handling Middleware
const UploadErrorHandler = (err, req, res, next) => {
    console.log("In upload error handler fun");
    
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({ success: false, message: "File size too large! (Max: 2MB)" });
            case "LIMIT_FILE_COUNT":
                return res.status(400).json({ success: false, message: "Too many files! (Max: 1 files allowed)" });
            case "LIMIT_UNEXPECTED_FILE":
                return res.status(400).json({ success: false, message: "Unsupported file type!" });
            default:
                return res.status(400).json({ success: false, message: err.message });
        }
    } else if (err) {
        return res.status(500).json({ success: false, message: "Server error occurred!" });
    }
    next();
};

module.exports = { FileUploadController, UploadErrorHandler };
