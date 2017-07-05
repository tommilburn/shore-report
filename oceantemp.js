var Xray = require('x-ray');
var xray = Xray();

module.exports = Ocean

var temperature = ""

function Ocean(url, selector){
	this.url = url;
	this.selector = selector;
	var temperature = "error";
	this.update = function update(){
		console.log("temp 1 = " + temperature);
		console.log(this.temperature)
		xray(url, selector)(function(err, result){
			if(err){
				console.log(err);
				temperature = "error"
			} else if(result.indexOf("°" != -1)){
				temperature = result.trim();
			} else {
				temperature = "error";
			}
		})
	}
	this.getTemp = function(){
		return temperature;
	}
}

