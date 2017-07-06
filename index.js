require('dotenv').config();
const express = require('express');
const app = express();
var ocean = require('./oceantemp.js');
var weather = require('./weather.js');

var seaside = {}
seaside.ocean = new ocean('http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)')
seaside.ocean.update();
seaside.weather = new weather('39.945594', '-74.069116');
seaside.weather.update();


app.get('/', function(req, res){
  res.send(seaside.weather.getWeather())
})

app.listen(3000, function(){
  console.log('app listening on port 3000!')
})

