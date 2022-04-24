/** @param {NS} ns */
export async function main(ns) {

    ns.tprint('\n\n')
    const row = '%-20s | %-20s | %8s | %12s | %12s | %12s | %12s ';
    ns.tprintf(row, 'Server', 'Parent', 'Rooted', 'Hack Lvl', 'Ports', 'RAM', 'Max Money');
    ns.tprintf(row, '-------', '-------', '-------', '-------', '-------', '-------', '-------');

    //ns.tprintf(row, 'home', '', ns.hasRootAccess('home'), '0', ns.getServerNumPortsRequired('home'), formatBytes(ns.getServerMaxRam('home')));

    const allServers = ['home']

    for (let i = 0; i < allServers.length; i++) {
        // This server is the current index we're working on.
        let thisServer = allServers[i];
        // Get the parent of this server.
        let parentServer = ''
        if (thisServer == 'home') {
            parentServer = ''
        } else {
            parentServer = ns.scan(allServers[i])[0]
        }
        // Initialize the output variables.
        let rooted = ns.hasRootAccess(allServers[i])
        let hackingLevel = ns.getServerRequiredHackingLevel(allServers[i])
        let portsRequired = ns.getServerNumPortsRequired(allServers[i])
        let ram = formatBytes(ns.getServerMaxRam(allServers[i]))
        let maxMoney = ns.nFormat(ns.getServerMaxMoney(allServers[i]), '($ 0.00 a)')

        // Add the data to the server table.
        ns.tprintf(row, thisServer, parentServer, rooted, hackingLevel, portsRequired, ram, maxMoney);

        // Scan this server for children.
        let foundServer = ns.scan(allServers[i]);

        // Remove the parent server from the array.
        if (thisServer != 'home') {
            foundServer.splice(0, 1)
        }

        // If the resulting arrays length is greater than 1 (meaning it can see another tier of server) 
        if (foundServer.length > 0) {
            // Add each item in the array to the allServers array if it doesn't already exist.
            for (let j = 0; j < foundServer.length; j++) {
                if (allServers.indexOf(foundServer[j]) == -1) {
                    allServers.push(foundServer[j]);
                }
            }
        }
    }

    // Format RAM values - from the internet.
    
    function formatBytes(bytes, decimals = 2) {
        bytes = ((bytes * 1024) * 1024) * 1024;
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}