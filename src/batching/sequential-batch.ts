import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    const target = String(ns.args[0]);
    ns.disableLog("sleep");
    const serverObject = ns.getServer("home");
    const coresAvailable = serverObject.cpuCores
    while (true) {
        // Weaken
        if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
            const weakenThreadsRequired = Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / 0.05);
            const weakenThreadsAvailable = Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("/batching/weaken.js", "home")));
            let actualWeakenThreads = 0;
            if (weakenThreadsRequired > weakenThreadsAvailable) {
                actualWeakenThreads = weakenThreadsAvailable;
            } else {
                actualWeakenThreads = weakenThreadsRequired;
            }
            const weakenPID = ns.exec(`/batching/weaken.js`, "home", actualWeakenThreads, target);
            while (ns.isRunning(weakenPID, "home")) {
                await ns.sleep(20);
            }
        }
        // Grow
        else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)){
            let currentMoney = ns.getServerMoneyAvailable(target);
            if (currentMoney <= 0) currentMoney = 1;
            const growThreadsRequired = Math.ceil(ns.growthAnalyze(target, (ns.getServerMaxMoney(target) / currentMoney), coresAvailable));
            const growThreadsAvailable = Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("/batching/grow.js", "home")));
            let actualGrowThreads = 0;            
            if (growThreadsRequired > growThreadsAvailable) {
                actualGrowThreads = growThreadsAvailable;
            } else {
                actualGrowThreads = growThreadsRequired;
            }
            const growPID =  ns.exec(`/batching/grow.js`, "home", actualGrowThreads, target);
            while (ns.isRunning(growPID, "home")) {
                await ns.sleep(20);
            }
        }
        // Hack
        else {
            const hackThreadsRequired = Math.ceil(ns.hackAnalyzeThreads(target, ns.getServerMaxMoney(target)));
            const hackThreadsAvailable = Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("/batching/hack.js", "home")));
            let actualHackThreads = 0;
            if (hackThreadsRequired > hackThreadsAvailable) {
                actualHackThreads = hackThreadsAvailable;
            } else {
                actualHackThreads = hackThreadsRequired;
            }
            const hackPID =  ns.exec(`/batching/hack.js`, "home", actualHackThreads, target);
            while (ns.isRunning(hackPID, "home")) {
                await ns.sleep(20);
            }
        }
        // mandatory sleep
        await ns.sleep(20)
    }
}