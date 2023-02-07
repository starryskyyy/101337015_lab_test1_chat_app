require("dotenv").config()
const path = require("path")
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socket = require('socket.io')


const userRoutes = require("./routes/UserRoutes")
const bodyParser = require('body-parser');

const messageFormat = require('./public/js/messages')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const DB_CONNECTION_STRING = process.env.DATABASE_URL
const SERVER_PORT = process.env.PORT || 3009

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
})

app.use(userRoutes)

var server = app.listen(SERVER_PORT, () => { console.log(`Server running at http://localhost:${SERVER_PORT}`) })

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'chat.html'));

});

const io = socket(server)

io.on('connection', socket => {
  console.log("Client socket connection")

  let user = ""
  socket.on("userName", function(userName) {
    console.log("User name:", userName);
    user = userName
  });

  socket.emit('message', messageFormat('Bot', 'Enjoy chatting!'))

  socket.broadcast.emit('message', messageFormat(user, ' has joined the chat'))

  socket.on('disconnect', () => {
    io.emit('message', messageFormat(user,'User have left the chat'))
  })

  socket.on('displayMsg', msg => {
    io.emit('message', messageFormat(user,msg))
  })

  
})