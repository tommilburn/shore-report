require('dotenv').config();
const moment = require('moment');
const express = require('express');
const app = express();
const pug = require('pug');
app.set('view engine', 'pug')
app.set('views', './views')

var beaches = require('./beaches.js');
var ocean = require('./oceantemp.js');
var weather = require('./weather.js');
var tides = require('./tides.js');

var seaside = {}
seaside.ocean = new ocean('http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)')
seaside.ocean.update();
seaside.tides = new tides('https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + moment().format("YYYYMMDD") + '&end_date=' + moment().add(10, "day").format("YYYYMMDD") + '&datum=MLLW&station=8533071&time_zone=lst_ldt&units=english&interval=hilo&format=json');
seaside.tides.update();

seaside.weather = new weather('39.945594', '-74.069116');
seaside.weather.update();

app.get('/seaside', function(req, res){
  var date = moment();
  var beach = seaside;
  if(!beach.tides.error && !beach.weather.error){
    var events = beach.tides.tidesOnDay(date).concat(beach.weather.eventsOnDay(date)); 
    events = events.sort(function(a, b){
      a = a.date.unix();
      b = b.date.unix();
      return a<b ? -1 : a>b ? 1: 0;
    });
  }
  res.render('index', {weather: beach.weather.weatherOnDay(date), ocean: beach.ocean.getTemp(), events: events, currentWeather: beach.weather.getCurrentWeather()});
});
app.get('/:beach/:date', function(req, res){
  var requestDate = moment(req.params.date, "YYYY-MM-DD", true);
  if(req.params.date === 'today'){
    res.send(req.params.beach + " today");
  } else if (req.params.date === "tomorrow"){
    res.send(req.params.beach + " tomorrow");
  } else if(requestDate.isValid()){
    res.send(req.params.beach + " " + requestDate);
  } else {
    res.send(req.params.beach + ", problem with date");
  }
});

app.get('/:beach', function(req, res){
  console.log(2);
  res.send(req.params.beach + " today");
});
app.get('*', function(req, res){
  console.log(3);
    res.send('what???', 404);
});

app.listen(3000, function(){
  console.log('app listening on port 3000!')
});
