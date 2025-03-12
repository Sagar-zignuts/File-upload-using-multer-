const upload = require("../middleware/MulterConfig");
const FileUploadController = require("../controller/index");
const router = require("express").Router();

router.post("/upload-file",FileUploadController);

module.exports = router;
