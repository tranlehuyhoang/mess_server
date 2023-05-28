import express from "express";
const app = express();
import axios from "axios";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connect from "./database/connect.js";
import router from "./routers/router.js";
import { saveMessage } from "./controller/controller.js";
app.use(cors({

  origin: ['https://tranlehuyhoang.github.io/mess_clientf/', 'https://tranlehuyhoang.github.io', 'http://localhost:3000'],
  credentials: true

}));
app.use(express.json());
connect();
app.use('/api', router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://tranlehuyhoang.github.io', 'https://tranlehuyhoang.github.io/mess_clientf/', 'http://localhost:3000'],
    credentials: true
  }
});

io.on("connection", (socket) => {


  socket.on("join_room", (data) => {
    socket.emit("send_user", socket.id);
    io.emit('user_online')
    socket.join(data);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
    console.log(saveMessage(data.room, data))
  });
  socket.on("disconnect", async (data) => {
    io.emit("status_user", socket.id);

    if (socket.id) {
      try {
        const response = await axios.post('api/status', {
          ids: socket.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
    console.log(`User Disconnected: ${socket.id}`);
  });

});

server.listen(5000, () => {
  console.log("SERVER RUNNING");
});