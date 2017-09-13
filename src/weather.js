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
      //console.log(res);
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
      console.log("error" + err);
      weather.error = err;
    });
  };

  this.weatherOnDay = function(requestedDay){
    if(weather.days){
      for(var i = 0; i < weather.days.length; i++){
        if(moment(weather.days[i].date).isSame(requestedDay, "day")){
          return weather.days[i].info
        }
      }
    } else {
      return {error: weather.error};
    }
  }
  this.eventsOnDay = function(requestedDay){
    if(weather.events){
      return weather.events.filter(function(weatherEvent){
        return moment(weatherEvent.date).isSame(requestedDay, "day");
      })
    } else {
      return {error: weather.error};
    }
  }

  this.getCurrentWeather = function(){
    return weather.currently;
  }

}
