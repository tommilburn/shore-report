require('dotenv').config();
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const app = express();
const pug = require('pug');
const validator = require('validator');
const path = require('path');


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/public', express.static(path.join(__dirname + '/public')));

app.set('view engine', 'pug')
app.set('views', './views')

var Model = require('./src/model.js');
var apiCalls = 900; //only 1000 free API calls allowed to Darksky per day, so 900 to be safe

var beaches = new Model(apiCalls);

app.get('/:beach', function(req, res){
    var day = moment()
    var beach = beaches.getBeach(req.params.beach);
    if(typeof(beach) === "object" && !beach.error){
      res.render('beach', {beach: beach, currentWeather: beach.currentWeather(), ocean: beach.currentOcean(), dailyWeather: beach.weatherOnDay(day), events: beach.eventsOnDay(day)});
    } else {
      res.render('error', {message: "We don't have that location yet!"});
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

app.get('/', function(req, res){
  var messages = {};
  messages.submission = req.query.submission;
  res.render('home', {available: beaches.getBeachLinks(), messages});
});

app.post('/request', urlencodedParser, function(req, res){
  var request = validator.whitelist(req.body.locationRequested, /a-zA-Z0-9 /);
  console.log(request);
  if(request.length < 120){
    fs.appendFile('requests.txt', request + '\n', function(err){
      if(err) throw err;
      console.log('saved');
      res.redirect('/?submission=success');
    });
  };
});
app.get('*', function(req, res){
  app.send('404');
});

app.listen(3000, function(){
  console.log('app listening on port 3000!')
});
