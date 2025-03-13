const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const uploadRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", uploadRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
