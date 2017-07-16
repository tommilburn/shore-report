const request = require('request');
const moment = require('moment');

module.exports = Tides;

function Tides(station, start, end){
  'use strict';
  var tideData;
  var tideEvents = [];
  var url = 'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + moment(start).format("YYYYMMDD") + '&end_date=' + moment(end).add(10, "day").format("YYYYMMDD") + '&datum=MLLW&station=' + station + '&time_zone=lst_ldt&units=english&interval=hilo&format=json';
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
