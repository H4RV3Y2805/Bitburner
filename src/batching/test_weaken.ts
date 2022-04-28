import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    const target = String(ns.args[0]);
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        await ns.weaken(target);
    }        
}