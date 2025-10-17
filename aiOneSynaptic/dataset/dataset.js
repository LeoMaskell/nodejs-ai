const fs = require('fs');
const { parse } = require('csv-parse'); // Destructure the parse function from the library

function loadDataset() {
    return new Promise((resolve, reject) => {
        const csvData = [];
        fs.createReadStream(__dirname + '/mushrooms.csv')
            .pipe(parse({ delimiter: ',' }))
            .on('data', function (csvrow) {
                csvData.push(csvrow); // Push each row into the csvData array
            })
            .on('error', function (error) {
                console.error('Error reading or parsing file:', error); // Log errors
                reject(error);
            })
            .on('end', function () {
                resolve(csvData); // Resolve the Promise with the parsed data
            });
    });
}

module.exports = { loadDataset };