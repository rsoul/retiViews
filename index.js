const turf = require('@turf/turf');
function Car(id,fuel_level){
	this.id=id;
	this.fuel_level=fuel_level;
	this.pos=getRandomLegalPosition();
	this.inUse=false;
}
const availableArea=[12.38,41.82,12.60,41.96];
function getRandomLegalPosition(){
	return turf.randomPosition(availableArea)
}


var cars=[]

for (var i = 1; i < 50; i++) {
	new_car=new Car(i,100)
	cars.push(new_car)
	console.log(new_car.pos)
}


var express = require('express');
var app = express();
var server = app.listen(3000,()=>console.log("Fired up server! Listening on port 3000"))
var socket = require('socket.io');
var io = socket(server);
/*const passport = require('passport');
const Gstrategy= require('passport-google-oauth20')



const keys = require("./keys");



passport.use{
	new Gstrategy({
		clientID:keys.google.clientID,
		clientSecret:keys.google.clientSecret

	})
}*/


app.get('/',function(req,res){

	res.sendFile('public/index.html', { root: __dirname })
});

io.on('connection',function(socket){
	for (var i = cars.length - 1; i >= 0; i--) {
		io.emit('car-info',JSON.stringify(cars[i]))
		console.log("sending car ",cars[i].id)
	}
	

	})





