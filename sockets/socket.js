// socket.js

import { Server } from "socket.io";

export default function initializeSocket(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  const activeUsers = [];

  const addActiveUsers = (user) => {
    // Check if the user is already in the activeUsers array
    const existingUserIndex = activeUsers.findIndex((u) => u.userId === user.userId);
    if (existingUserIndex === -1) {
      // If the user is not already in the array, add it
      activeUsers.push(user);
    } else {
      // If the user is already in the array, update the socketId
      activeUsers[existingUserIndex].socketId = user.socketId;
    }
  };

  const getUser = (userId) => {
    console.log(activeUsers, "active users");
    console.log(userId);
    return activeUsers.find((user) => {
      return user.userId === userId;
    });
  };

  const removeActiveUsers = (userId) => {
    // Find the index of the user with the given userId
    const indexToRemove = activeUsers.findIndex((user) => user.userId === userId);
    if (indexToRemove !== -1) {
      // If the user is found, remove it from the array
      activeUsers.splice(indexToRemove, 1);
    }
  };

  io.on("connection", (socket) => {
    console.log("socket connection established");

    // Handle the "userLogin" event
    socket.on("login", (data) => {
      addActiveUsers({ userId: data, socketId: socket.id });
      io.emit("sendActiveUsers", activeUsers);
    });

    socket.on("sendMessage", (data) => {
      console.log(data.receiverId, "receiver id");
      const user = getUser(data.receiverId);
      user && io.to(user.socketId).emit("getMessage", data);
    });

    socket.on("logout", (data) => {
      removeActiveUsers(data.user);
      io.emit("removeActiveUsers", activeUsers);

      // Handle logout logic here
    });

    // Other event handlers...
  });
}
