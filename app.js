const app = require('express')();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
})

io.on('connection', (socket) => {
  console.log('a user connected');
})

const PORT = 4000

http.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})