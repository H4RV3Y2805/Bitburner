import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    // In this we want to grow a server to Max money and weaken
    // the server to minimum security level.

    // Define the target server.
    const target = String(ns.args[0]);

    while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) || ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
            const weakenThreadsRequired = Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / 0.05);
            const weakenThreadsAvailable = Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("/batching/prep-weaken.js", "home")));
            let actualWeakenThreads = 0;
            if (weakenThreadsRequired > weakenThreadsAvailable) {
                actualWeakenThreads = weakenThreadsAvailable;
            } else {
                actualWeakenThreads = weakenThreadsRequired;
            }
            const weakenPID = ns.exec(`/batching/prep-weaken.js`, "home", actualWeakenThreads, target);
            while (ns.isRunning(weakenPID, "home")) {
                await ns.sleep(20);
            }
        }
        else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)){
            const growThreadsRequired = Math.ceil(ns.growthAnalyze(target, (ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target))));
            const growThreadsAvailable = Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("/batching/prep-grow.js", "home")));
            let actualGrowThreads = 0;            
            if (growThreadsRequired > growThreadsAvailable) {
                actualGrowThreads = growThreadsAvailable;
            } else {
                actualGrowThreads = growThreadsRequired;
            }
            const growPID =  ns.exec(`/batching/prep-grow.js`, "home", actualGrowThreads, target);
            while (ns.isRunning(growPID, "home")) {
                await ns.sleep(20);
            }
        }
        else {
            break;
        }        
    }
    
    ns.alert(target + " is prepped.");

}

