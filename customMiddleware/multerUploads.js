import multer from "multer";

import fs from "fs";

const directory = "uploads";

// Check if the directory exists, and if not, create it
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = file.originalname.replace(/[^\w.-]/g, ""); // Remove special characters
    const encodedFileName = encodeURIComponent(sanitizedFileName); // URL encode the file name
    cb(null, Date.now() + "-" + encodedFileName); // File name
  },
});
// Initialize multer with the configured storage
export const upload = multer({ storage: storage });
