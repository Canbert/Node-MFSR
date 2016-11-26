var socket = io();
$('form').submit(function(){

    var date = new Date();
    var timestamp = date.toString();

    socket.emit('userMsg', {username: user.username, message: $('#msg').val(), timestamp: timestamp});
    $('#msg').val('');
    return false;
});
socket.on('userMsg', function(msg){
    $('#messages').append($(
        '<div class="callout">' +
        '<sup>' + msg.timestamp + '</sup></br>' +
        '<b>' + msg.username + ': </b>' +
        msg.message +
        '</div>'));
});

socket.on('serverMsg', function(msg){
    $('#messages').append($(
        '<div class="alert callout" data-closable>' +
         msg +
        '<button class="close-button" aria-label="Dismiss alert" type="button" data-close>' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>'));
});

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}