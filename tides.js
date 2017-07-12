const request = require('request');

module.exports = Tides;

function Tides(url){
  console.log("tide request made");
  'use strict';
  var tideData
  var events = {};
  this.update = function(){
    request(url, function(err, res, body){
      console.log(body); 
      if(body){
        tideData = JSON.parse(body);
        buildTides();
      }
    });
  }
  function buildTides() {
    events.today = [];
     
  }
  this.getTides = function(){
    if(tideData.predictions){
      return tideData;
    } else {
      return "error";
    }
  }
}
