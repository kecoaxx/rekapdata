const fs = require('fs');
const os = require('os');

function readJSON(path){
    let json = JSON.parse(fs.readFileSync(path));
    return json;
  }

function getWifiLocalIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    let wifiIpAddress = null;

    // Loop through network interfaces
    Object.keys(networkInterfaces).forEach((interfaceName) => {
        const interfaces = networkInterfaces[interfaceName];

        // Check if the interface is a Wi-Fi interface
        const isWifiInterface = interfaceName.toLowerCase().includes('wi-fi') ||
                                interfaceName.toLowerCase().includes('wireless');

        if (isWifiInterface) {
        // Loop through interfaces
        interfaces.forEach((iface) => {
            // Check for IPv4 and non-internal (i.e., not localhost) addresses
            if (iface.family === 'IPv4' && !iface.internal) {
            wifiIpAddress = iface.address;
            }
        });
        }
    });

    return wifiIpAddress;
}

module.exports = {
    readJSON,
    getWifiLocalIpAddress
}

