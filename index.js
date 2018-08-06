const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const stylesService = mbxStyles({ accessToken: MY_ACCESS_TOKEN });

var express = require('express');
var app = express();



app.get('/',function(req,res){

	res.send('still testing')
});