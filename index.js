require('dotenv').config();
const moment = require('moment');
const express = require('express');
const app = express();
const pug = require('pug');
app.set('view engine', 'pug')
app.set('views', './views')
var Model = require('./model.js');

var apiCalls = 900; //only 1000 free API calls allowed to Darksky per day, so 900 to be safe

var beaches = new Model(900);
console.log(beaches);
/*
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
*/
/*
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
*/
app.get('/:beach', function(req, res){
    res.send(beaches.getBeach(req.params.beach));
});
app.get('*', function(req, res){
});

app.listen(3000, function(){
  console.log('app listening on port 3000!')
});
