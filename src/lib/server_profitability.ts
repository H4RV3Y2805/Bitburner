import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    // script to work out the best server.

    // Money/Sec -- Time it takes to run a full cycle. HWGW.

    // Variables
    const target = String(ns.args[0]);
    const maxCash = ns.getServerMaxMoney(target);
    const hackTime = ns.getHackTime(target);
    
    ns.print("Max Cash: " + ns.nFormat(maxCash, '($0.00a)'));
    ns.print("Hack Time: " + ns.tFormat(hackTime, true));

}