const FileUploadController = (req, res) => {
    //check file is uploaded or not
    if (!req.file) {
        return res.status(400).json({ message: "File is not selected..." });
    } else {
        res.json({ message: "File uploaded successfully", file: req.file });
    }
};

module.exports = FileUploadController;
