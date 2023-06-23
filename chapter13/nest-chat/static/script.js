/* eslint-disable prettier/prettier */
const socket = io('http://localhost:3000/chat');
const nickname = prompt('닉네임을 입력해주세요.');

socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  const message = $('#message').val();
  $('#chat').append(`<div>나 : ${message}</div>`);
  socket.emit('message', { message, nickname });
}

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});
