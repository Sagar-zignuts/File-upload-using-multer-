const express = require("express");
const router = express.Router();
const upload = require("../middleware/MulterConfig");
const { FileUploadController, UploadErrorHandler } = require("../controller/FileUploadController");

router.post("/upload-file", upload.single("file"), FileUploadController, UploadErrorHandler);

module.exports = router;
