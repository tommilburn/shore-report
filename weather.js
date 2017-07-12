require('dotenv').config();
const DarkSky = require('dark-sky');
const forecast = new DarkSky(process.env.DARKSKY_KEY);
const moment = require('moment');

module.exports = Weather;

function Weather(latitude, longitude){
  'use strict';
  var weather = {};
  var rawData;
  var events = [];
  this.update = function () {
    forecast
    .latitude(latitude)
    .longitude(longitude)
    .exclude('minutely,hourly,flags')
    .get()
    .then(function(res){
      rawData = res;
      weather.currently = rawData.currently;
      weather.days = [];
      weather.events = []
      for(var i = 0; i < rawData.daily.data.length; i++){
        weather.days.push({type: "weather", date: moment().startOf('day').add(i, 'days'), info: rawData.daily.data[i]});
        weather.events.push({type:"Sunrise", date: moment(rawData.daily.data[i].sunriseTime, "X")});
        weather.events.push({type:"Sunset", date: moment(rawData.daily.data[i].sunsetTime, "X")});
      }
    })
    .catch(function(err){
      console.log(err);
    });
  };
  

  this.weatherOnDay = function(requestedDay){
    for(var i = 0; i < weather.days.length; i++){
      console.log(weather.days[i].date);
      if(moment(weather.days[i].date).isSame(requestedDay, "day")){
        return weather.days[i].info
      }
    }
  }

  this.currentWeather = function(){
    return weather.currently;
  }

}
