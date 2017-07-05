const express = require('express')
const app = express()
var ocean = require('./oceantemp.js')

var seaside = new ocean('http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)')

seaside.update()

app.get('/', function(req, res){
	res.send(seaside.getTemp())
})

app.listen(3000, function(){
	console.log('app listening on port 3000!')
})
