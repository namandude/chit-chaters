//for joining clinet to server we need to add script in hml file
//  http://localhost:8000/socket.io/socket.io.js

const socket=io("http://localhost:8000",{ transports: ["websocket","polling","flashsocket"] });


const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");
 var audio = new Audio('funny.mp3');
// above line means jab bhi apne message aynge apnko .container me dakna hai 4
const append=(message,position)=>{
    const messageElement= document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){

audio.play();}
}


// first we take the usee name promnpts

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // This command so that page not reloaded again and again
    const message = messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''

})

 const naame= prompt("Enter your Name");
socket.emit('new-user-joined',naame);
socket.on('user-joined', naame=>{
append(`${naame} joined the chat`,'right');
})
socket.on('receive', data=>{
    append(`${data.naame} : ${data.message}`,"left");
    })

socket.on('left', naame=>{
    append(`${naame} left the chqaat `,"left");
    })
