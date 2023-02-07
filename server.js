require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
var socket = require('socket.io')

const app = express()
app.use(express.json())

const DB_CONNECTION_STRING = process.env.DATABASE_URL
const SERVER_PORT = process.env.PORT || 3000

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
})

var server = app.listen(SERVER_PORT, () => { console.log(`Server running at http://localhost:${SERVER_PORT}/`) })

var io = socket(server)