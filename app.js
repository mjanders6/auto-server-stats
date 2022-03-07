require('dotenv').config()

const { prompt } = require('inquirer')
const Table = require('cli-table');
const { exec } = require('child_process');

// instantiate
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
    , colWidths: [25, 50]
});



// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['CPU', 'Second value']
    , ['Hard Drive', 'Second value']
);

console.log(table.toString());


exec('sudo vgs', (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});