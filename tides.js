const request = require('request');
const moment = require('moment');

module.exports = Tides;

function Tides(url){
  'use strict';
  var tideData
  var tideEvents = [];
  this.update = function(){
    request(url, function(err, res, body){
      if(body){
        tideData = JSON.parse(body);
        buildTides();
      }
    });
  }
  function buildTides() {
    for(var i = 0; i < tideData.predictions.length; i ++){
      var tideEvent = {}
      if(tideData.predictions[i].type === "H"){
        tideEvent.type = "high tide";
      } else {
        tideEvent.type = "low tide";
      }
      tideEvent.date = moment(tideData.predictions[i].t);
      tideEvents.push(tideEvent);
    }
  }
  this.getTides = function(){
    if(tideData.predictions){
      return tideData;
    } else {
      return "error";
    }
  }
  this.tidesOnDay = function(requestedDay){
    return tideEvents.filter(function(el){
      return(moment(el.date).isSame(requestedDay, "day"));
    });
  }
}
