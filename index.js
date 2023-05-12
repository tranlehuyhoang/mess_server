import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connect from "./database/connect.js";
import router from "./routers/router.js";
import { saveMessage } from "./controller/controller.js";
app.use(cors({

  origin: ['https://tranlehuyhoang.github.io/client_mess', 'https://tranlehuyhoang.github.io', 'http://localhost:3000'],
  credentials: true

}));
app.use(express.json());
connect();
app.use('/api', router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://tranlehuyhoang.github.io', 'https://tranlehuyhoang.github.io/client_mess', 'http://localhost:3000'],
    credentials: true
  }
});
let online = []
io.on("connection", (socket) => {


  socket.on("join_room", (data) => {
    socket.join(data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    io.to(data).emit("online_users", online);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
    console.log(saveMessage(data.room, data))
  });
  socket.on("disconnect", () => {
    online = online.filter((id) => id !== socket.id);
    console.log(`User Disconnected: ${socket.id}`);
    io.emit("online_users", online);
  });
  socket.on("online_users", (users) => {
    // Update online status list with new users
    console.log("Online Users:", users);
  });
});

server.listen(5000, () => {
  console.log("SERVER RUNNING");
});