#!/usr/bin/env node

const si = require('systeminformation');
const Table = require('cli-table');

var comp_Data = new Array()

var table = new Table({
    head: ['Function', 'Info']
    , colWidths: [25, 150]
});

async function compData() {
    try {
        const cpuData = await si.cpu();
        const memData = await si.mem();
        const system = await si.system();
        const bios = await si.bios();
        const motherboard = await si.baseboard();
        const os = await si.osInfo();
        const users = await si.users();

        table.push(
            { User: [`User: ${users[0].user}`]},
            { CPU: [`Brand: ${cpuData.manufacturer} ${cpuData.brand} | Speed: ${cpuData.speedMax}`] },
            { Memory: [`Free: ${memData.free/1000000000} | Used: ${memData.used/1000000000} | Total: ${memData.total/1000000000}`] },
            { System: [`Manufacturer: ${system.manufacturer} | Model: ${system.model}`]},
            { BIOS: [`Vendor: ${bios.vendor} | Version: ${bios.version} | Release Date: ${bios.releaseDate} | Revision: ${bios.revision}`]},
            { Motherboard: [`Manufacturer: ${motherboard.manufacturer} | MOdel: ${motherboard.model} | Version: ${motherboard.version} | Memory Slots: ${motherboard.memSlots}`]},
            { OS: [`Op. System: ${os.platform} | Distro: ${os.distro} | Release: ${os.release} | Host Name: ${os.hostname} | Kernal: ${os.kernel}`]}
        )
        return table
    } catch (e) {
        console.log(e)
    }
}


compData()
    .then(data => {
        console.log(data.toString())
    })
    .catch(e => console.error(e))