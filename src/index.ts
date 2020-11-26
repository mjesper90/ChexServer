var protobuf = require("protobufjs");
var protobuf = require("protobufjs/light");
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
import { Point, Hex, Layout } from './libs/hexlib';
import { Player } from './protoloader';

let p = new Player("asd","","","");
console.log(p)
p.Serialize()
console.log(p.PPlayer1)


var layout = new Layout(Layout.flat, new Point(1,1) ,new Point(122,272));


io.on('connection', function (socket:any) {
    
    
    socket.on('RegisterClient', function (client:any) {
        console.log("\n-------====RegisterClient====-------------");

    });

    socket.on('AcknowledgeRegister', function (data:any) {
        console.log("\n-------====AcknowledgeRegister====-------------")
        //console.log("Username : "+data.Username + ", ServerId : " + data.ServerId + ", ClientId : " + data.ClientId)

    });

    socket.on('Login', function(account:any){
        //If username + password exists
        console.log("====LOGIN====")
        console.log(account)
        console.log("====LOGIN====")
        socket.emit("LoginResponse", {response : "Valid"});
        //else
        //socket.emit("LoginResponse", {response : "Invalid"});     
 
    })
});