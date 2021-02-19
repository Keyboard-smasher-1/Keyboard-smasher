const app = require('express')();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origin: "https://keyboard-smasher-d4345.web.app",
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true
})

let users = []

io.on('connection', (socket) => {
  // add logged-in username to users array
  
  // Broadcast when a user connects
  socket.on('newUser', (username) => {
    users.push(username)
    console.log('ini user:', users)
    io.emit('userOnline', users)
  })

  socket.on('startGame', (data) => {
    io.emit('countingGame', data)
  })

  // socket.emit('loggedIn', {
  //   users: users.map(data => data.username)
  // })

  // Broadcast when a user typing the keyboard
  socket.on('newTyping', (typing) => {
    io.emit('serverTyping', typing)
  })

  // Broadcast when a user wins
  socket.on('UserWinner', (message) => {
    io.emit('serverUserWinner', message)
  })

  socket.on("shareTyping", (text) => {
    socket.broadcast.emit("enemyText", text);
  })

  socket.on("removeUser", (data) => {
    let newUsers = users.filter(el => {el !== data})
    users.splice(users.indexOf(data), 1)
    io.emit('afterLogout', users)

    users = newUsers
  })

   // Run when a user disconnects
   socket.on('disconnect', () => {
    io.emit('message', 'A user has left the game')
  })
})

const PORT = process.env.PORT || 4000

http.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})