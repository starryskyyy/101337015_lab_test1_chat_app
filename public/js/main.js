const formChat = document.getElementById('form-chat')
const socket = io()
const chatMsgs = document.querySelector('.chat-messages')
const userList = document.getElementById('users');

socket.emit("userName", sessionStorage.getItem("userName"))
console.log(sessionStorage.getItem("userName"))

socket.on('message', message => {
  console.log(message)
  displayMessage(message)

  chatMsgs.scrollTop = chatMsgs.scrollHeight
})

// msg submit

formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  //get msg text
  const message = e.target.elements.message.value
  //emit to server
  socket.emit('displayMsg', message)

  e.target.elements.message.value = ''
  e.target.elements.message.focus()
})


function displayMessage(msg) {
  const div = document.createElement('div')
  div.classList.add('msg')
  div.innerHTML = `<p class="meta">${msg.user} <span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`
  document.querySelector('.chat-messages').appendChild(div)
}

socket.on('username', (username) => {
  document.getElementById('username').innerHTML = username;
});

