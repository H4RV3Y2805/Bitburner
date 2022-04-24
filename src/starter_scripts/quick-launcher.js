/** @param {NS} ns */
export async function main(ns) {

    let scriptArgs = ns.args[0];

    let host = ns.getHostname();
    let threads = threadCheck(host);

    function threadCheck(host) {
        let freeRAM = (ns.getServerMaxRam(host)- 20) - ns.getServerUsedRam(host)
        let scriptRAM = ns.getScriptRam("early-hack-template.js", host)
        let scriptThreads = Math.floor(freeRAM / scriptRAM)
        return scriptThreads
    }

    ns.exec("early-hack-template.js", host, threads, scriptArgs);

}