var fs = require('fs'); 
var { parse } = require('csv-parse'); // Destructure the parse function from the library

var csvData = [];
fs.createReadStream(__dirname + '/dataset/mushrooms.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function(csvrow) {
        csvData.push(csvrow); // Push each row into the csvData array
//        console.log(csvrow);      
    })
    .on('error', function(error) {
        console.error('Error reading or parsing file:', error); // Log errors
    })
    .on('end', function() {
        // Process the csvData array
        console.log(csvData);
    });