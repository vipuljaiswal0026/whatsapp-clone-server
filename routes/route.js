import express from "express";
import { addUser, getUsers } from "../controller/userController.js";
import { addConversation, getConversation } from "../controller/conversationController.js";
import { uploadFile, getUrl } from "../controller/fileController.js";
import { getMessages, sendMessage } from "../controller/messageController.js";
import { upload } from "../customMiddleware/multerUploads.js";

const router = express.Router();

router.post("/adduser", addUser);

router.get("/users", getUsers);

router.post("/conversation/add", addConversation);

router.post("/conversation/get", getConversation);

router.post("/messages/add", sendMessage);

router.get("/messages/get/:id", getMessages);

router.post("/file/upload", upload.single("file"), uploadFile);

router.get("/file/getUrl/:key", getUrl);

export default router;
