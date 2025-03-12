const express = require("express");
const FileUploadRoute = require("./routes/index");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api", FileUploadRoute);

app.listen(port, () => {
    console.log(`Server running on port number ${port}`);
});
