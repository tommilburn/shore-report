require('dotenv').config();
const express = require('express');
const DarkSky = require('dark-sky');
const forecast = new DarkSky(process.env.DARKSKY_KEY);

module.exports = Weather;

function Weather(latitude, longitude){
  'use strict';
  var weather = {}
  var rawData;
  this.update = function () {
    forecast
    .latitude(latitude)
    .longitude(longitude)
    .exclude('minutely,hourly,flags')
    .get()
    .then(function(res){
      rawData = res;
      buildWeather();
    })
    .catch(function(err){
      console.log(err);
    });
  };
  function buildWeather(){
    weather.today = {}
    weather.tomorrow = {}
    weather.today.temperature = rawData.currently.apparentTemperature;
    weather.today.humidity = rawData.currently.humidity;
    weather.today.precipitation = rawData.currently.precipProbability;
    weather.today.wind = rawData.currently.windSpeed;
    weather.today.summary = rawData.daily.data[0].summary;
    weather.today.high = rawData.daily.data[0].temperatureMax;
    weather.today.low = rawData.daily.data[0].temperatureMin;
    weather.today.sunrise = rawData.daily.data[0].sunriseTime; 
    weather.today.sunset = rawData.daily.data[0].sunsetTime; 

    weather.tomorrow.summary = rawData.daily.data[1].summary;
    weather.tomorrow.sunrise = rawData.daily.data[1].sunriseTime;
    weather.tomorrow.sunset = rawData.daily.data[1].sunsetTime;
    weather.tomorrow.high = rawData.daily.data[1].temperatureMax;
    weather.tomorrow.low = rawData.daily.data[1].temperatureMin;
  }
  this.getWeather = function(){
    return weather;
  }
}
