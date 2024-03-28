import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import bodyParser from "body-parser";
import http from "http";
import Connection from "./database/db.js";
import initializeSocket from "./sockets/socket.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const Port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

initializeSocket(server);
app.use(router);

Connection();

server.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
