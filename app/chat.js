var showdown = require('showdown');
var converter = new showdown.Converter();

module.exports = function (io) {

    var users = [];

    io.on('connection', function (socket) {
        console.log('Socket.io chat: user connected');

        socket.on('newUser',function (data, callback) {
            if (users.indexOf(data) != -1){
                callback(false);
            } else {
                callback(true);
                socket.user = data;
                users.push(socket.user);
                io.sockets.emit('users', users);
            }
        });

        socket.on('userMsg', function (msg) {
            msg.message = converter.makeHtml(escapeHtml(msg.message));
            console.log("Socket.io chat: " + msg.username + ' said ' + msg.message);
            io.emit('userMsg', msg);
        });

        socket.on('disconnect', function (data) {
            console.log('Socket.io chat: user disconnected');
            if(!socket.user) return;
            users.splice(users.indexOf(socket.user),1);
            io.sockets.emit('users', users);
        });
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}