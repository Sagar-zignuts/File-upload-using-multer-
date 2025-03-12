const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageDir = path.join(__dirname + "../../uploads/image");
const documentDir = path.join(__dirname + "../../uploads/document");

const LINIT_FILE_SIZE = 2 * 1024 * 1024

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

if (!fs.existsSync(documentDir)) {
    fs.mkdirSync(documentDir, { recursive: true });
}

//create storage and make file validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // this is file type based on MIME (Multipurpose Internet Mail Extensions) ,  based on this we seprate the files
        const fileType = {
            "image/jpeg": "image",
            "image/png": "image",
            "image/jpg": "image",
            "image/gif": "image",
            "application/pdf": "document",
            "application/msword": "document",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                "document",
        };
        const folder = fileType[file.mimetype];

        if (folder) {
            cb(null, path.join(__dirname + `../../uploads/${folder}`));
        } else {
            cb(new Error("File type is not allowed here , Sorry ...."), false);
        }
    },
    filename: (req, file, cb) => {
        //just use for set file name as currnent_name + filename format
        let ts = Date.now();
        let date_time = new Date(ts);
        let date = date_time.getDate();
        let month = date_time.getMonth() + 1;
        let year = date_time.getFullYear();

        cb(null, ` ${Date.now()}_${year}_${month}_${date}_${file.originalname}`);
    },
});

// File filter for validation

const fileFilter = (req, file, cb) => {
    const allowedFile = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedFile.includes(file.mimetype)) {
        return cb(new Error("Unsupported file......"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize:  LINIT_FILE_SIZE},
});

module.exports = upload;
