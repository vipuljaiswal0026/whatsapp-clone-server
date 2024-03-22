import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.Mongo_URL;
console.log(URL);

const Connection = async () => {
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("error while connecting with the database", error.message);
  }
};

export default Connection;
