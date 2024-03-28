import multer from "multer";

const storage = multer.memoryStorage();

// Initialize multer with the configured storage
export const upload = multer({ storage: storage });
