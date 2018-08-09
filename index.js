

const turf = require('@turf/turf');
function Car(id,fuel_level){
	this.id=id;
	this.fuel_level=fuel_level;
	this.pos=getRandomLegalPosition();
	this.inUse=false;
	this.color='#'+(Math.floor(Math.random()*16777215).toString(16));
}

function Trip(car,route,id){
	this.car=car;
	this.route=route;
	this.id=id;

}
const availableArea=[12.38,41.82,12.60,41.96];
function getRandomLegalPosition(){
	return turf.randomPosition(availableArea)
}
/*
function planTrip(car,destination){
	start=car.pos

	if(not enough fuel||inUse==true){
		return false;
	}
	else{

	}
}*/

function getRoute(startingPoint,destination){
	return ('https://api.mapbox.com/directions/v5/mapbox/driving/'+startingPoint[0]+','+startingPoint[1]+';'+destination[0]+','+destination[1]+'?geometries=geojson&access_token=pk.eyJ1IjoicnNvdWxsIiwiYSI6ImNqa2l3c2F0dTFhMTkza28zNXhnMjZ4b3UifQ.EuutLwZpj-2ZD5LVZiDlvw')
}
var cars=[];
var activeTrips=[];

for (var i = 1; i < 20; i++) {
	new_car=new Car(i,100)
	cars.push(new_car)
	new_trip=new Trip(new_car,getRoute(new_car.pos,getRandomLegalPosition()),i);
	activeTrips.push(new_trip);	
}

var express = require('express');
var app = express();
var server = app.listen(3000,()=>console.log("Fired up server! Listening on port 3000"))
var socket = require('socket.io');
var io = socket(server);
/*const passport = require('passport');
const Gstrategy= require('passport-google-oauth20')







passport.use{
	new Gstrategy({
		clientID:keys.google.clientID,
		clientSecret:keys.google.clientSecret

	})
}*/


app.get('/',function(req,res){

	res.sendFile('public/index.html', { root: __dirname })
});

io.sockets.on('connection',function(socket){
	console.log('Sending cars to',socket.id)
	for (var i = cars.length - 1; i >= 0; i--) {
		io.emit('car-info',JSON.stringify(cars[i]))
	}
	
	for(var i=0;i<activeTrips.length;i++){
		io.emit('route',activeTrips[i].route,activeTrips[i].car.color);
	}
	})







