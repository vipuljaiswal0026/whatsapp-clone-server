import AWS from "aws-sdk";

import dotenv from "dotenv";

dotenv.config();

// AWS configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.PROJECT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.PROJECT_AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const bucketName = "vipul-whatsapp-clone";
const folderName = "uploads";

// Function to upload file to S3
export function uploadFileToS3(file) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
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
