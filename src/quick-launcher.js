/** @param {NS} ns */
export async function main(ns) {

    let host = ns.getHostname();
    let threads = threadCheck(host);

    function threadCheck(host) {
        let freeRAM = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
        let scriptRAM = ns.getScriptRam("early-hack-template.js", host)
        let scriptThreads = Math.floor(freeRAM / scriptRAM)
        return scriptThreads
    }

    ns.exec("early-hack-template.js", host, threads);

}