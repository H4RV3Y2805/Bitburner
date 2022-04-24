/** @param {NS} ns */
export async function main(ns) {

    // Get base list of servers.
    const allServers = ns.scan('home');

    // Now we need to loop through the array of servers and scan each one.

    for (let i = 0; i < allServers.length; i++) {
        // Scan each server.
        let foundServer = ns.scan(allServers[i]);
        // Remove the parent server from the array.
        foundServer.splice(0, 1);
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

    ns.tprint("All servers: " + allServers);

}