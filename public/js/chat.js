var socket = io();

var $users = $("#active-users");

$(document).ready(function () {
   socket.emit('newUser', user.username, function(data){
       if(data){
           console.log("yep");
       }else{
           console.log("nope");
       }
   });
});

$('form').submit(function(){

    var date = new Date();
    var timestamp = date.toString();

    socket.emit('userMsg', {username: user.username, message: $('#msg').val(), timestamp: timestamp});
    $('#msg').val('');
    return false;
});

$('#msg').on('keydown', function(event){
    if (event.which == 13) {
        if(event.ctrlKey || event.shiftKey || event.altKey){
            //event.stopPropagation();
        } else {
            $('form').submit();
            event.preventDefault();
        }
    }
});

socket.on('userMsg', function(msg){
    if(msg.username != user.username){ //only send notification if not from self
        notifyMe(msg);
    }
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

socket.on('users', function (data){
    var html = '';
    for (i=0; i < data.length; i++){
        html += data[i] + '<br/>';
        $users.html(html);
    }
});

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function notifyMe(msg) {

    var title = "MFSR";
    var options = {
        body: msg.message
    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(title,options);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(title,options);
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}