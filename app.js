#!/usr/bin/env node

const si = require('systeminformation');
const Table = require('cli-table');
const columnify = require('columnify')

var comp_Data = new Array()

// var table = new Table({
//     head: ['Function', 'Info']
//     , colWidths: [25, 150]
// });

async function compData() {
    try {
        const cpuData = await si.cpu();
        const memData = await si.mem();
        // const system = await si.system();
        const bios = await si.bios();
        const motherboard = await si.baseboard();
        // const os = await si.osInfo();
        const users = await si.users();

        var table = [{
            name: `User`,
            paths: [`${users[0].user}`]
        }, {
            name: 'CPU',
            paths: [
                `Manufacturer: ${cpuData.manufacturer}`,
                `Brand: ${cpuData.brand}`,
                `Cores: ${cpuData.cores}`,
                `Speed: ${cpuData.speed}`,
                `Max Speed: ${cpuData.speedMax}`
            ].join('\n')
        }, {
            name: `Memory`,
            paths: [
                `Free: ${memData.free / 1000000000}`,
                `Used: ${memData.used / 1000000000}`,
                `Total: ${memData.total / 1000000000}`
            ].join('\n')
        }, {
            name: `BIOS`,
            paths: [
                `Vendor: ${bios.vendor}`,
                `Version: ${bios.version}`,
                `Release Date: ${bios.releaseDate}`,
                `Revision: ${bios.revision}`
            ].join('\n')
        }, {
            name: `Motherboard`,
            paths: [
                `Manufacturer: ${motherboard.manufacturer}`,
                `Model: ${motherboard.model}`,
                `Version: ${motherboard.version}`,
                `Memory Slots: ${motherboard.memSlots}`
            ].join('\n')
        }]

        // table.push(
        //     { User: [`User: ${users[0].user}`]},
        //     { CPU: [`Brand: ${cpuData.manufacturer} ${cpuData.brand} | Speed: ${cpuData.speedMax}`] },
        //     { Memory: [`Free: ${memData.free/1000000000} | Used: ${memData.used/1000000000} | Total: ${memData.total/1000000000}`] },
        //     { System: [`Manufacturer: ${system.manufacturer} | Model: ${system.model}`]},
        //     { BIOS: [`Vendor: ${bios.vendor} | Version: ${bios.version} | Release Date: ${bios.releaseDate} | Revision: ${bios.revision}`]},
        //     { Motherboard: [`Manufacturer: ${motherboard.manufacturer} | Model: ${motherboard.model} | Version: ${motherboard.version} | Memory Slots: ${motherboard.memSlots}`]},
        //     { OS: [`Op. System: ${os.platform} | Distro: ${os.distro} | Release: ${os.release} | Host Name: ${os.hostname} | Kernal: ${os.kernel}`]}
        // )
        return table
    } catch (e) {
        console.log(e)
    }
}


compData()
    .then(data => {
        console.log(columnify(data, { preserveNewLines: true }))
    })
    .catch(e => console.error(e))