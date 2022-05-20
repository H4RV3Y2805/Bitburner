import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    // Get base list of servers.
	const allServers = ns.scan('home');

    // Loop through all our servers.

    for (let i = 0; i < allServers.length; i++) {
		// Scan each server.
		const foundServer = ns.scan(allServers[i]);
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

    // Print out our list of servers.

    // ns.tprint("All servers: " + allServers);

    // Get my Port Level

	let portLevel = 0

	// 1. BruteSSH.exe
	if (ns.fileExists("BruteSSH.exe", "home") && portLevel == 0) {
		portLevel = 1
	}

	// 2. FTPCrack.exe 
	if (ns.fileExists("FTPCrack.exe", "home") && portLevel == 1) {
		portLevel = 2
	}

	// 3. relaySMTP.exe 
	if (ns.fileExists("relaySMTP.exe", "home") && portLevel == 2) {
		portLevel = 3
	}

	// 4. HTTPWorm.exe
	if (ns.fileExists("HTTPWorm.exe", "home") && portLevel == 3) {
		portLevel = 4
	}

	// 5. SQLInject.exe
	if (ns.fileExists("SQLInject.exe", "home") && portLevel == 4) {
		portLevel = 5
	}

    // Run NUKE.exe on all t1 servers that I am able to hack.

	allServers.forEach(tryNuke)

	function tryNuke(host: string) {
		if (ns.hasRootAccess(host) == false) {
			if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host)) {
				if (ns.getServerNumPortsRequired(host) <= portLevel) {
					if (ns.fileExists("brutessh.exe", "home")) {
						ns.brutessh(host)
					}
					if (ns.fileExists("ftpcrack.exe", "home")) {
						ns.ftpcrack(host)
					}
					if (ns.fileExists("relaysmtp.exe", "home")) {
						ns.relaysmtp(host)
					}
					if (ns.fileExists("httpworm.exe", "home")) {
						ns.httpworm(host)
					}
					if (ns.fileExists("sqlinject.exe", "home")) {
						ns.sqlinject(host)
					}
					ns.nuke(host)
					ns.tprint("We now have root access to: " + host)
				}
			}
		}
	}
}