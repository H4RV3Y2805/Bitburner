/** @param {NS} ns */
export async function main(ns) {

	let scriptArgs = ns.args[0];

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

	// Get my Port Level

	let portLevel = 0

	// 1. BruteSSH.exe
	if (ns.fileExists("BruteSSH.exe", "home")) {
		portLevel = 1
	}

	// 2. FTPCrack.exe 
	if (ns.fileExists("FTPCrack.exe", "home")) {
		portLevel = 2
	}

	// 3. relaySMTP.exe 
	if (ns.fileExists("relaySMTP.exe", "home")) {
		portLevel = 3
	}

	// 4. HTTPWorm.exe
	if (ns.fileExists("HTTPWorm.exe", "home")) {
		portLevel = 4
	}

	// 5. SQLInject.exe
	if (ns.fileExists("SQLInject.exe", "home")) {
		portLevel = 5
	}

	// Run NUKE.exe on all t1 servers that I am able to hack.

	allServers.forEach(tryNuke)

	function tryNuke(host) {
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

	// Move hack file to Nuked server
	// Check RAM to determine threads
	// Run hack script with n threads

	for (let host of allServers) {
		if (ns.hasRootAccess(host) == true) {
			ns.killall(host)
			let threads = threadCheck(host)
			if (threads > 0) {
				await ns.scp("early-hack-template.js", "home", host)
				ns.exec("early-hack-template.js", host, threads, scriptArgs)
			}

		}
	}

	function threadCheck(host) {
		let freeRAM = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
		let scriptRAM = ns.getScriptRam("early-hack-template.js", "home")
		let scriptThreads = Math.floor(freeRAM / scriptRAM)
		return scriptThreads
	}
}