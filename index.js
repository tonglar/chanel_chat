/**
 * Created by tonglar on 11/13/2017 AD.
 */
var app = require('express')();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
var http = require('http').Server(app);
var io = require('socket.io')(http);

// io.set('origins', '*:*');


app.get('/', function(req, res){
    res.send('<h1>FOOTBALL CHAT</h1>');
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

var chanel1 = io
    .of('/chanel1')
    .on('connection', function (socket) {
        // socket.emit('a message', {
        //     that: 'only',
        //     '/chat' : 'will get'
        // });
        console.log('chanel1 connected');

        socket.on('a message',function (msg) {
            console.log("a massage",msg)
            chanel1.emit('a message',msg);
        });
        socket.on('add user',function (usr) {
            console.log("add user",usr)
            chanel1.emit('add user',usr);
        });
        socket.on('typing' , function (username) {
            if(username == "") {
                console.log("Guest is typing")
            }else{
                console.log(username + " is typing")
            }
        })
    });
var chanel2 = io
    .of('/chanel2')
    .on('connection', function (socket) {
        // socket.emit('a message', {
        //     that: 'only',
        //     '/chat' : 'will get'
        // });
        console.log('chanel1 connected');

        socket.on('a message',function (msg) {
            console.log("a massage",msg)
            chanel2.emit('a message',msg);
        });
        socket.on('add user',function (usr) {
            console.log("add user",usr)
            chanel2.emit('add user',usr);
        });
        socket.on('typing' , function (username) {
            if(username == "") {
                console.log("Guest is typing")
            }else{
                console.log(username + " is typing")
            }
        })
    });