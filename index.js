

const turf = require('@turf/turf');
var request = require('request');
var rp = require('request-promise');
var mosca = require('mosca');
var chalk = require('chalk');


var test_route={"routes":[{"geometry":{"coordinates":[[12.540858,41.916801],[12.541969,41.916305],[12.542885,41.917089],[12.55246,41.913644],[12.556153,41.908164],[12.557367,41.901735],[12.558004,41.902827],[12.5763,41.908869],[12.602462,41.915156],[12.609464,41.919072],[12.612053,41.918875],[12.615667,41.913905],[12.614133,41.888253],[12.600654,41.863852],[12.595119,41.846581],[12.588809,41.835479],[12.583442,41.83091],[12.58015,41.822292],[12.575537,41.81534],[12.572124,41.812294],[12.552255,41.801699],[12.535093,41.797692],[12.536451,41.801513],[12.533714,41.806155],[12.522557,41.815149],[12.521708,41.819299],[12.518066,41.824177],[12.518298,41.82673],[12.519939,41.8275],[12.518444,41.827797],[12.513473,41.834023],[12.507861,41.837895]],"type":"LineString"},"legs":[{"summary":"","weight":2214.5,"duration":2066.5,"steps":[],"distance":29461.7}],"weight_name":"routability","weight":2214.5,"duration":2066.5,"distance":29461.7}],"waypoints":[{"name":"Via della Trachite","location":[12.540858,41.916801]},{"name":"Via di Grotta Perfetta","location":[12.507861,41.837895]}],"code":"Ok","uuid":"cjl3pv40u04q73pnushqh6mca"}

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
	console.log(chalk.green('Client connected →', client.id));	

});



mqtt.on('clientDisconnected', function(client) {
console.log(chalk.red('Client Disconnected →', client.id));
});

function Car(id,fuel_level){
	this.id=id;
	this.fuel_level=fuel_level;
	this.pos=[12.507730137808464,41.83781028494388]//getRandomLegalPosition();
	
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

//implement promises no u dumb fuck request then push to array
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


for (var i = 1; i < 2; i++) {
	new_car=new Car(i,100)
	cars.push(new_car)
	console.log("car",i)
	
	
	new_trip=new Trip(new_car,test_route,i,null); // second parameter getRoute(new_car.pos,getRandomLegalPosition()
	activeTrips.push(new_trip);	
}

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

app.get('/signup',function(req,res){

	res.sendFile('public/signup.html', { root: __dirname })
});

app.get('/login',function(req,res){

	res.sendFile('public/login.html', { root: __dirname })
});


io.sockets.on('connection',function(socket){
	console.log('Sending cars to',socket.id)
	/*
	for (var i = cars.length - 1; i >= 0; i--) {
		io.emit('car-info',JSON.stringify(cars[i]))
	}*/
	
	for(var i=0;i<activeTrips.length;i++){
		io.emit('route',activeTrips[i].route,activeTrips[i].car.color);
	}
	})

function ha(){
	j=0;
	for (var i = cars.length - 1; i >= 0; i--) {

		mqtt.publish({topic:'car-pos',payload:JSON.stringify(cars[i])})
		cars[i].pos=test_route.routes[0].geometry.coordinates[j];
		j++
	}
		
	}
	
setInterval(ha,1000)







