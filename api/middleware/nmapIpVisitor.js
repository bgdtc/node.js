// IMPORT FS ------------------------------------------
const { fstat } = require('fs');
const fs = require('fs');

//IMPORT IPWARE ---------------------------------------
let getIP = require('ipware')().get_ip;

// VARIABLE IP DU VISITEUR ----------------------------
let ipVisitor = ''

// FONCTION DU MIDDLEWARE -----------------------------
function fnNmap(ipInfo) {
    console.log('IP FN: ', ipInfo)

    ipVisitor = ipInfo.clientIp[7] + ipInfo.clientIp[8] + ipInfo.clientIp[9] + ipInfo.clientIp[10] + ipInfo.clientIp[11] + ipInfo.clientIp[12] + ipInfo.clientIp[13] + ipInfo.clientIp[14] + ipInfo.clientIp[15] + ipInfo.clientIp[16] + ipInfo.clientIp[17] + ipInfo.clientIp[18]

    const { exec } = require('child_process');

    // EXECUTION DE NMAP SUR LA MACHINE 
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
// COPIE DU RESULTAT DU SCAN DANS LE FICHIER DATA1.TXT--
        fs.writeFileSync('data1.txt', stdout)
// EXEC DE METASPLOIT, A CONTINUER ---------------------
        exec(`msfconsole`, (error, stdout, stderr) => {
            console.log(`stdout:\n${stdout}`);
        })

    });


}

//EXPORT MODULE ---------------------------------------
module.exports = (req, res, next) => {
    let ipInfo = getIP(req);
    fnNmap(ipInfo)
    next();
}
