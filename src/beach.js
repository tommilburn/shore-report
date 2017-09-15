var moment = require('moment');
var ocean = require('./oceantemp.js');
var weather = require('./weather.js');
var tides = require('./tides.js');

module.exports = Beach;

function Beach(source){
  this.name = source.name;
  this.url = source.url;
  var timeOffset = source.timeOffset;
  var name = source.name;
  var w = new weather(source.latitude, source.longitude);
  var t = new tides(source.station, moment(), moment().add(7, 'days'));
  var o;
  if(source.scrapeOceanUrl && source.scrapeOceanLocation){
    o = new ocean(source.scrapeOceanUrl, source.scrapeOceanLocation);
  } else {
    o = new ocean(source.station);
  } 
  this.update = function(){
    console.log("updating " + name + " " + moment().format('LLLL'));
    w.update();
    t.update();
    o.update();
  }
  this.currentWeather = function(){
    var d = w.getCurrentWeather();
    return d;
  };
  this.currentOcean = function(){
    return o.getTemperature();
  };
  this.weatherOnDay = function(day){
    return w.weatherOnDay(day);
  };
  this.eventsOnDay = function(day){
    var events = t.tidesOnDay(day).concat(w.eventsOnDay(day)); 
    events = events.sort(function(a, b){
      a = a.date.unix();
      b = b.date.unix();
      return a < b ? -1 : a > b ? 1: 0;
    });
//    console.log(events);
    return events;
  }
  this.getLocalTime = function(){
    console.log(this.name);
    if(timeOffset){
      return moment().add(timeOffset, 'hours'); //times are on the east coast because everything revolves around me
    }
    else{
      return moment();
    }
  }
}
