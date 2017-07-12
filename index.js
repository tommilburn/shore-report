require('dotenv').config();
const moment = require('moment');
const express = require('express');
const app = express();
const pug = require('pug');
app.set('view engine', 'pug')
app.set('views', './views')

var ocean = require('./oceantemp.js');
var weather = require('./weather.js');
var tides = require('./tides.js');

var seaside = {}
seaside.ocean = new ocean('http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)')
seaside.ocean.update();
//seaside.tides = new tides('https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20170704&end_date=20170705&datum=MLLW&station=8533071&time_zone=lst_ldt&units=english&interval=hilo&format=json');
//seaside.tides.update();



seaside.weather = new weather('39.945594', '-74.069116');
seaside.weather.update();

app.get('/', function(req, res){
  //res.render('index', {water: seaside.ocean.getTemp(), tides: seaside.tides.getTides(), weather: seaside.weather.dailyWeather(moment())});
  // console.log(seaside.weather.weatherOnDay(moment()));
  res.render('index', {weather: seaside.weather.weatherOnDay(moment()), ocean: seaside.ocean.getTemp()});
})

app.listen(3000, function(){
  console.log('app listening on port 3000!')
})

