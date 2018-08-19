

const turf = require('@turf/turf');
var request = require('request');
var rp = require('request-promise');
var mosca = require('mosca');
var chalk = require('chalk');


var mqtt = new mosca.Server({
  http: {
    port: 4545,
    bundle: true,
    static: './'
  }
});

mqtt.on('ready', function(){
	console.log(chalk.cyan.bold('MQTT broker is up and running on port 4545'))});

mqtt.on('clientConnected', function(client) {
	console.log(chalk.green('client connected', client.id));	

});



mqtt.on('clientDisconnected', function(client) {
console.log(chalk.red('Client Disconnected:', client.id));
});

function Car(id,fuel_level){
	this.id=id;
	this.fuel_level=fuel_level;
	this.pos=getRandomLegalPosition();
	this.inUse=false;
	this.color='#'+(Math.floor(Math.random()*16777215).toString(16));
}

function Trip(car,route,id,user){
	this.car=car;
	this.route=route;
	this.id=id;
	this.user=user;

}

function Robot(id){
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
	var url='https://api.mapbox.com/directions/v5/mapbox/driving/'+startingPoint[0]+','+startingPoint[1]+';'+destination[0]+','+destination[1]+'?geometries=geojson&access_token=pk.eyJ1IjoicnNvdWxsIiwiYSI6ImNqa2l3c2F0dTFhMTkza28zNXhnMjZ4b3UifQ.EuutLwZpj-2ZD5LVZiDlvw';
	var route;
	rp(url,
		function(error, response, body) {
  			if(response.statusCode=='200'){
  				
  				console.log(chalk.green('Mapbox returned trip correctly!'));
  				return body
  			}
  			else{
  				console.log(chalk.red(error));
  			}
  	
  }
)

}
var cars=[];
var activeTrips=[];


for (var i = 1; i < 20; i++) {
	new_car=new Car(i,100)
	cars.push(new_car)}/*
	if(Math.round(Math.random())==0){
	new_trip=new Trip(new_car,getRoute(new_car.pos,getRandomLegalPosition()),i,null);
	activeTrips.push(new_trip);	}
}
*/
var express = require('express');
var app = express();
var port = process.env.port || 9999;
var server = app.listen(port,()=>console.log(chalk.magenta.bold("Main server up and running on port",port)))
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
	/*
	for (var i = cars.length - 1; i >= 0; i--) {
		io.emit('car-info',JSON.stringify(cars[i]))
	}
	
	for(var i=0;i<activeTrips.length;i++){
		io.emit('route',activeTrips[i].route,activeTrips[i].car.color);
	}*/
	})

function ha(){
	for (var i = cars.length - 1; i >= 0; i--) {
		mqtt.publish({topic:'car-pos',payload:JSON.stringify(cars[i])})}
		
	}
	
setInterval(ha,10000)







