import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    // Target:

    const target = String(ns.args[0]);
    
    
    //In this script we need to get the information about the batch process.
    // We're going to use joesguns as a test case.

    // To do a batch, we need to first "prep" the server so that it is full
    // with cash and the security is at it's minimum.
    // Therfore, we need to know the security and money status.

    // We want to watch this process so lets disable the logging.
    ns.disableLog("ALL");
    ns.tail();
    while(true) {

        // Header:
        
        ns.print("-------------------------------------------------------------------------------");
        ns.print("| ██████╗  █████╗ ████████╗ ██████╗██╗  ██╗    ██╗███╗   ██╗███████╗ ██████╗  |")
        ns.print("| ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║  ██║    ██║████╗  ██║██╔════╝██╔═══██╗ |")
        ns.print("| ██████╔╝███████║   ██║   ██║     ███████║    ██║██╔██╗ ██║█████╗  ██║   ██║ |")
        ns.print("| ██╔══██╗██╔══██║   ██║   ██║     ██╔══██║    ██║██║╚██╗██║██╔══╝  ██║   ██║ |")
        ns.print("| ██████╔╝██║  ██║   ██║   ╚██████╗██║  ██║    ██║██║ ╚████║██║     ╚██████╔╝ |")
        ns.print("| ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝  |")
        ns.print("-------------------------------------------------------------------------------");
        ns.print("");
        
        // Main Script:

        const row = '| %-25s | %-30s |';
        ns.printf(row, "-------------------------", "------------------------------");
        ns.printf(row, "Information", "Value");
        

        // Server Data:

        ns.printf(row, "-------------------------", "------------------------------");
        ns.printf(row, "Server Name ( Hack Lvl )", target + " ( " + ns.getServerRequiredHackingLevel(target) + " )");
        ns.printf(row, "Server Max Money", ns.nFormat(ns.getServerMaxMoney(target), '($0.00a)'));
        ns.printf(row, "Server Curr. Money", ns.nFormat(ns.getServerMoneyAvailable(target), '($0.00a)'));
        ns.printf(row, "Server Min Security", ns.nFormat(ns.getServerMinSecurityLevel(target), '0.000'));
        ns.printf(row, "Server Curr. Security", ns.nFormat(ns.getServerSecurityLevel(target), '0.000'));

        // HWGW Data:

        ns.printf(row, "-------------------------", "------------------------------");
        ns.printf(row, "Hack Chance", ns.nFormat(ns.hackAnalyzeChance(target), '0%'));
        ns.printf(row, "Hack Time", ns.tFormat(ns.getHackTime(target),true));
        ns.printf(row, "Weaken Time", ns.tFormat(ns.getWeakenTime(target), true));
        ns.printf(row, "Grow Time", ns.tFormat(ns.getGrowTime(target), true));

        // Thread Data:

        ns.printf(row, "-------------------------", "------------------------------");
        ns.printf(row, "Hack Threads", Math.ceil(ns.hackAnalyzeThreads(target, ns.getServerMaxMoney(target))));
        ns.printf(row, "Grow Threads", Math.ceil(ns.growthAnalyze(target, (ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target)))));
        ns.printf(row, "Weaken Threads", Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / 0.05));        

        // Footer:

        ns.printf(row, "-------------------------", "------------------------------");

        await ns.sleep(200);
        ns.clearLog();
    }



}