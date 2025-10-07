var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
fs.createReadStream(__dirname + '/dataset/mushrooms.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);      
    })
    .on('end',function() {
        //do something with csvData
        console.log(csvData);
    });