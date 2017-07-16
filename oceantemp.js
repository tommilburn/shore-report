var moment = require('moment');
var Xray = require('x-ray');
var request = require('request');
var xray = Xray();

module.exports = Ocean

var temperature = ""

function Ocean(queryType, selector){
	var temperature = {};
  if(selector){
    this.update = makeScrapeUpdater(queryType, selector);
  } else if(typeof(queryType) === "number") {
    this.update = makeNoaaUpdater(queryType);
  } else {
    console.log("error in fetching ocean tides");
    this.temperature = "error";
    this.update = function(){return "error"};
  }

	this.getTemperature = function(){
		return temperature;
	}

	function makeScrapeUpdater(url, selector){
		return function(){
      xray(url, selector)(function(err, result){
        if(err){
          console.log(err);
          temperature = "unavailable"
        } else if(result.indexOf("°" != -1)){
          temperature = result.trim();
        } else {
          temperature = "unavailable";
        }
      })
    }
	}

  function makeNoaaUpdater(station){
    return function(){
      var url = 'https://tidesandcurrents.noaa.gov/api/datagetter?product=water_temperature&date=latest&station=' + station + '&format=json&units=english&time_zone=lst_ldt';
      request(url, function(err, res, body){
        if(body){
          console.log(body);
          temperature = JSON.parse(body).data[0].v;
        }
      });
    }
  }

}

