var moment = require('moment');
var ocean = require('./oceantemp.js');
var weather = require('./weather.js');
var tides = require('./tides.js');

module.exports = Beach

function Beach(source){
  var currentData = {};
  console.log(source);

  currentData.weather = new weather(source.longitude, source.latitude);
  currentData.tides = new tides(source.station, moment(), moment().add(7, 'days'));
  if(source.scrapeOceanUrl && source.scrapeOceanLocation){
    currentData.ocean = new ocean(source.scrapeOceanUrl, source.scrapeOceanLocation);
  } else {
    currentData.ocean = new ocean(source.station);
  }
  this.update = function(){
    currentData.tides.update();
    currentData.weather.update();
    currentData.ocean.update();
  }
  this.getInfo = function(){
    return JSON.stringify(currentData.tides.getTides()) + JSON.stringify(currentData.weather.getCurrentWeather()) + JSON.stringify(currentData.weather.weatherOnDay(moment())) + JSON.stringify(currentData.ocean.getTemperature());
  }
}
