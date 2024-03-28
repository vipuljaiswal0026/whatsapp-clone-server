import AWS from "aws-sdk";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

// AWS configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const bucketName = "whatsapp-clone-2";
const folderName = "uploads";

// Function to upload file to S3
export function uploadFileToS3(file) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/${Date.now()}-${file.originalname}`,
      Body: fs.createReadStream(file.path),
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

export function downloadFilefromS3(key) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: key, // Specify the key (filename) of the object to read
    };

    // Read file from S3
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error("Error reading file from S3:", err);
        reject(err);
      } else {
        // File data is available in data.Body
        resolve(data.Body);
      }
    });
  });
}

export async function generatePresignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 3600, // URL expires in 1 hour (adjust as needed)
  };

  // Generate presigned URL
  const url = await s3.getSignedUrlPromise("getObject", params);
  return { url, expiration: 3600 };
}
