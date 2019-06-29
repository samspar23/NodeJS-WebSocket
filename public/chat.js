var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

message.addEventListener('keydown', function() {
    socket.emit('typing', {
        message: this.value,
        handle: handle.value
    });
});

socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = '';
});

socket.on('typing', function(data) {
    feedback.innerHTML = data.message ? '<p><em>' + data.handle + ' is typing a message...</em></p>' : '';
});