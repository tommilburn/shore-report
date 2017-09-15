const moment = require('moment');
const beach = require('./beach');

var beachInfo = [
  {
    url: "seaside",
    name: "Seaside Heights, NJ",
    station: 8533071,
    latitude: '39.945594',
    longitude: '-74.069116',
    scrapeOceanUrl: 'http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', 
    scrapeOceanLocation: '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)'
  },
  {
    url:"capemay",
    name: "Cape May, NJ",
    station: 8536110,
    latitude: '38.934205',
    longitude: '-74.900494',
  },
  {
    url: "atlantic-city",
    name:"Atlantic City, NJ",
    station: 8534720,
    latitude: '39.364283',
    longitude: '-74.422927',
  },
  {
    url: "ocean-beach",
    name:"Ocean Beach, NJ",
    station: 8532885,
    latitude: '39.981507',
    longitude: '-74.066248',
  },
  {
    url: "san-francisco",
    name:"San Francisco, CA",
    station: 9414290,
    latitude: '37.774929',
    longitude: '-122.419416',
  }
]
module.exports = Model;
function Model(dailyCalls){
  this.dailyCalls = dailyCalls;
  this.updateInterval = (24 * 60 * 60 * 1000 / dailyCalls) * beachInfo.length;
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

