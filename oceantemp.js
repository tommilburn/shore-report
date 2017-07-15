var Xray = require('x-ray');
var xray = Xray();

module.exports = Ocean

var temperature = ""

function Ocean(url, selector){
	this.url = url;
	this.selector = selector;
	var temperature = {};
	this.update = function update(){
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
	this.getTemp = function(){
		return temperature;
	}
}

