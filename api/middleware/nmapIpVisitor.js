const { fstat } = require('fs');
const fs = require('fs');
// Module
let getIP = require('ipware')().get_ip;

let ipVisitor = ''

function fnNmap(ipInfo) {
    console.log('IP FN: ', ipInfo)
    // let data = this.ipInfo;
    ipVisitor = ipInfo.clientIp[7] + ipInfo.clientIp[8] + ipInfo.clientIp[9] + ipInfo.clientIp[10] + ipInfo.clientIp[11] + ipInfo.clientIp[12] + ipInfo.clientIp[13] + ipInfo.clientIp[14] + ipInfo.clientIp[15] + ipInfo.clientIp[16] + ipInfo.clientIp[17] + ipInfo.clientIp[18]
    // let dataStringified = JSON.stringify(data, null, 2);

    //fs.writeFile('data.json', dataStringified)
    const { exec } = require('child_process');

    exec(`nmap -Pn -vv  ` + ipVisitor, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout:\n${stdout}`);
        fs.writeFileSync('data1.txt', stdout)
        exec(`msfconsole`, (error, stdout, stderr) => {
            console.log(`stdout:\n${stdout}`);
        })

    });
    //let data 


}

// Middleware
module.exports = (req, res, next) => {
    let ipInfo = getIP(req);
    fnNmap(ipInfo)
    next();
}
