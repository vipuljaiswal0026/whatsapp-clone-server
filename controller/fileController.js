import { uploadFileToS3, generatePresignedUrl } from "../services/aws.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json("File not found");
    }
    const s3Url = await uploadFileToS3(req.file);

    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("File deleted successfully");
      }
    });

    // Split the URL by '/'
    const parts = s3Url.split("/");

    // Remove the domain part and join the rest of the parts to get the key
    const key = parts.pop();

    return res.status(200).json(key);
  } catch (error) {
    return res.status(501).json(err);
  }
};

// Route handler to fetch presigned URL
export const getUrl = async (req, res) => {
  const key = "uploads/" + req.params.key;
  console.log(key);

  try {
    const urlDetails = await generatePresignedUrl(key);
    console.log(urlDetails);
    res.status(200).json(urlDetails);
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
