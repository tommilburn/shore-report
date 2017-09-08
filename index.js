require('dotenv').config();
const moment = require('moment');
const express = require('express');

const app = express();
const pug = require('pug');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug')
app.set('views', './views')
var Model = require('./model.js');

var apiCalls = 900; //only 1000 free API calls allowed to Darksky per day, so 900 to be safe

var beaches = new Model(900);

app.get('/:beach', function(req, res){
    var day = moment()
    //console.log(req.originalUrl);
    var beach = beaches.getBeach(req.params.beach);
    if(typeof(beach) === "object" && !beach.error){
      //console.log(beach.currently());
      res.render('beach', {currentWeather: beach.currently(), dailyWeather: beach.weatherOnDay(day), events: beach.eventsOnDay(day)});
    }
});

app.get('/:beach/:date', function(req, res){
  var beach = beaches.getBeach(req.params.beach);
  var day = moment(req.params.date, "YYYY-MM-DD", true);
  if(req.params.date === 'today'){
    res.send(req.params.beach + " today");
  } else if (req.params.date === "tomorrow"){
    res.send(req.params.beach + " tomorrow");
  } else if(day.isValid()){
    res.render('beach', {dailyWeather: beach.weatherOnDay(day), events: beach.eventsOnDay(day)});
  } else {
    res.send(req.params.beach + ", problem with date");
  }
});

app.get('*', function(req, res){
  res.send(500);
});

app.listen(3000, function(){
  console.log('app listening on port 3000!')
});
