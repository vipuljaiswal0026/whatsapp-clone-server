import mongoose from "mongoose";

// Create a Mongoose model for file storage
const File = mongoose.model('File', {
    filename: String,
    contentType: String,
    size: Number,
    data: Buffer // Store file data as Buffer
  });