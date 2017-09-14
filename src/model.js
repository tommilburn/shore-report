const moment = require('moment');
const beach = require('./beach');

var beachInfo = [
  {
    url: "seaside",
    name: "Seaside Heights",
    station: 8533071,
    latitude: '39.945594',
    longitude: '-74.069116',
    scrapeOceanUrl: 'http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', 
    scrapeOceanLocation: '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)',
  },
  {
    url:"capemay",
    name: "Cape May",
    station: 8536110,
    latitude: '38.934205',
    longitude: '-74.900494',
    noaaOceanUrl: 'https://tidesandcurrents.noaa.gov/api/datagetter?product=water_temperature&date=latest&station=8536110&format=json&units=english&time_zone=lst_ldt',
  }
]
module.exports = Model;
function Model(dailyCalls){
  this.dailyCalls = dailyCalls;
  this.updateInterval = (24 * 60 * 60 * 1000 / dailyCalls) * beachInfo.length;
  console.log("interval: " + this.updateInterval);
  this.beaches = [];
  var timers = [];
  for(var i = 0; i < beachInfo.length; i++){
    this.beaches[beachInfo[i].url] = new beach(beachInfo[i]);
    var updateBeach = this.beaches[beachInfo[i].url].update;
    updateBeach();
    setInterval(updateBeach, this.updateInterval);
    
  }
  this.getBeach = function(beachName){
    if(this.beaches[beachName]){
      return this.beaches[beachName];
    } else { 
      return {error:"That beach isn't recognized"};
    };

  }
  this.getBeachLinks = function(){
    var links = [];
    for(b in this.beaches){
      var link = {};
      link.name = this.beaches[b].name;
      link.url = this.beaches[b].url;
      links.push(link);
    }
    return links;
  }
}

