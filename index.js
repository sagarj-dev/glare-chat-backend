const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});
let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on("userOnline", (user) => {
    onlineUsers.push(user);
    io.emit("userOnline", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit("userOffline", socket.id);
  });

  socket.on("sendMsg", (to, data) => {
    console.log(to);
    console.log(data);

    socket.to(to).emit("sendMsg", data);
  });
});
