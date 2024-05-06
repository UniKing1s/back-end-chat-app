import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import user from "./routes/user.js";
import message from "./routes/message.js";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
app.use(cors({ origin: "https://chat-app-alpha-rouge.vercel.app" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extends: true, limit: "30mb" }));
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("connect to db success");
    server.listen(5000, () => {
      console.log("Server running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/user", user);
app.use("/message", message);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-alpha-rouge.vercel.app",
    credentials: true,
  },
});
// const io = socket(server,s {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

//Tạo một biến onlineUser để khi người dùng truy cập vào trang sẽ được map vào để có thể nhận dữ liệu realtime
global.onlineUser = new Map();
global.userInOnline = [];
io.on("connection", (socket) => {
  console.log("user-connected");
  socket.on("add-user", (uid) => {
    //map user vào và id của socket để gửi thông tin tới socket id này
    if (uid) {
      onlineUser.set(uid, socket.id);
      if (!userInOnline.includes(uid)) {
        userInOnline.push(uid);
      }
      for (const i of userInOnline) {
        const userWillLoad = onlineUser.get(i);
        socket
          .to(userWillLoad)
          .emit("send-online-user", { userInOnline: userInOnline });
      }
      socket.emit("send-online-user", { userInOnline: userInOnline });

      console.log("send-online-user: ", userInOnline);
    }
    console.log(onlineUser);
    console.log(userInOnline);
  });
  socket.on("user-offline", (data) => {
    userInOnline = userInOnline.filter((value) => value !== data.uid);
    for (const i of userInOnline) {
      const userWillLoad = onlineUser.get(i);
      socket
        .to(userWillLoad)
        .emit("send-online-user", { userInOnline: userInOnline });
    }
    console.log("send-online-user: ", userInOnline);
  });
  socket.on("msg-sent", (data) => {
    const userWillGet = onlineUser.get(data.toUid);
    socket.to(userWillGet).emit("msg-receive", data);
  });
});
// app.get("/", (req, res) => {
//   res.send({ mess: "hi" });
// });
