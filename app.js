#!/usr/bin/env node

const si = require('systeminformation');
const Table = require('cli-table');

let cpuData = () => {

    var table = new Table({
        head: ['Function', 'Info']
        , colWidths: [25, 50]
    });

    si.cpu()
        .then(data => {
            let brand = data.brand;
            let manu = data.manufacturer;
            let vendor = data.vendor;
            let speed = data.speed;
            let cores = data.cores;

            return table.push(['CPU', [brand, manu]])
        })
        .catch(error => console.error(error));

}



