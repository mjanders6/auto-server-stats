#!/usr/bin/env node

const si = require('systeminformation');
const Table = require('cli-table');

var comp_Data = new Array()

var table = new Table({
    head: ['Function', 'Info']
    , colWidths: [25, 50]
});

async function compData() {
    try {
        const cpuData = await si.cpu();
        const memData = await si.mem();

        comp_Data.push({ CPU: [cpuData.brand, cpuData.model]}, {Memory: [memData.free, memData.used, memData.total] })
        return comp_Data
    } catch (e) {
        console.log(e)
    }
}


compData()
    .then(data => console.log(data))
    .catch(e => console.error(e))