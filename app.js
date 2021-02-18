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
  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the game')

  // Broadcast when a user typing the keyboard
  socket.on('newTyping', (typing) => {
    socket.broadcast.emit('serverTyping', typing)
  })

  // Broadcast when a user wins
  socket.on('UserWinner', (message) => {
    socket.broadcast.emit('serverUserWinner', message)
  })

  // Run when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the game')
  })
})

const PORT = 4000

http.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})