/** @param {NS} ns */
export async function main(ns) {

	// Make sure I'm in the home directory.

	// Run Scan to get a list of all Tier 1 servers and add to an array called t1.

	let t1 = ns.scan('home');

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
	// TODO - Rename all this as I'm not just Nuking anymore.

	t1.forEach(tryNuke)

	function tryNuke(host) {
		if (ns.hasRootAccess(host) == false) {
			if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host)) {
				if (ns.getServerNumPortsRequired(host) <= portLevel) {
					ns.nuke(host)
					ns.tprint("We now have root access to: " + host)
				}
			}
		}
	}

	// Move hack file to Nuked server
	// Check RAM to determine threads
	// Run hack script with n threads

	for (let host of t1) {
		if (ns.hasRootAccess(host) == true) {
			await ns.scp("early-hack-template.js", "home", host)
			let threads = threadCheck(host)
			ns.exec("early-hack-template.js", host, threads)
		}
	}

	function threadCheck(host) {
		let freeRAM = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
		let scriptRAM = ns.getScriptRam("early-hack-template.js", host)
		let scriptThreads = Math.floor(freeRAM / scriptRAM)
		return scriptThreads
	}
}