const upload = require('../middleware/MulterConfig')

const FileUploadController = (req, res) => {

    upload.single('file')(req,res, (error)=>{
        if (error) {
            if(error.code === "LIMIT_FILE_SIZE"){
                return res.status(400).json({message : "File size is to large...."})
            }
            else if(error.message === "Unsupported file......"){
                return res.status(400).json({message : error.message})
            }else{
                return res.status(500).json({message : "Server problem"})
            }
        }
        return res.status(200).json({ message: "File uploaded successfully", file: req.file });
    })
};

module.exports = FileUploadController;
