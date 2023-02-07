require("dotenv").config()
const path = require("path")
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socket = require('socket.io')
const userRoutes = require("./routes/UserRoutes")
const bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const DB_CONNECTION_STRING = process.env.DATABASE_URL
const SERVER_PORT = process.env.PORT || 3005

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

const io = socket(server)

io.on('connection', socket => {
  console.log("Client socket connection")
})