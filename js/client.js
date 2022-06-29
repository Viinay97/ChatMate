const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('sendInp')
const messageContainer = document.querySelector('.container')

var audio = new Audio('ting.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value = '';
})
const Name = prompt("Enter your name to join");

socket.emit('new-user-joined', Name); 

socket.on('user-joined', name =>{
    if(name != null){
        append(`${name} joined the chat`,'left');
    }
})

socket.on('receive', data =>{
    if(data.name != null){
        append(`${data.name}: ${data.message}`,'left');
    }
})

socket.on('left', name =>{
    if(name != null){
        append(`${name} left the chat`,'left');
    }
})
