/**
 * Created by tonglar on 11/13/2017 AD.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/chat', function(req, res){
    res.send('<h1>Hello world</h1>');
});

http.listen(1318, function(){
    console.log('listening on *:1318');
});
/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
*/
io.on('connection', function(socket){
    console.log('a user connected');
});

var chat = io
    .of('/chanel1')
    .on('connection', function (socket) {
        // socket.emit('a message', {
        //     that: 'only',
        //     '/chat' : 'will get'
        // });
        console.log('chanel1 connected');
        // chat.emit('a message',{
        //     everyone : 'has login',
        //     '/chat' : socket.clients
        // });
        socket.on('a message',function (msg) {
            console.log("a massage",msg)
            chat.emit('a message',msg);
        });
        socket.on('typing' , function (username) {
            if(username == "") {
                console.log("Guest is typing")
            }else{
                console.log(username + " is typing")
            }
        })
    });
