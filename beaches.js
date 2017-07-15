var moment = require('moment');

module.exports.seaside = {
  scrapeOceanUrl: 'http://www.surfline.com/surf-report/casino-pier-mid-atlantic_4279/', 
  scrapeOceanLocation: '#content > div.two-column300-left > div:nth-child(9) > div:nth-child(2) > span:nth-child(5)',
  tidesUrl: 'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + moment().format("YYYYMMDD") + '&end_date=' + moment().add(10, "day").format("YYYYMMDD")     + '&datum=MLLW&station=8533071&time_zone=lst_ldt&units=english&interval=hilo&format=json',
  latitide: '39.945594',
  longitude: '-74.069116'
}

module.exports.capeMay = {
  noaaOceanUrl: 'https://tidesandcurrents.noaa.gov/api/datagetter?product=water_temperature&date=latest&station=8536110&format=json&units=english&time_zone=lst_ldt',
  tidesUrl: function(start, end){return 'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + start + '&end_date=' + end + '&datum=MLLW&station=8536110&time_zone=lst_ldt&units=english&interval=hilo&format=json'},
  latitide: '38.934205',
  longitude: '-74.900494'
}
