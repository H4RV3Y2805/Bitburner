/** @param {NS} ns */
export async function main(ns) {

    // Set the target server from the input argument.
    let target = ns.args[0];

    // Get the minimum security level of the server.
    let minSecurity = ns.gerServerMinSecurityLevel(target);
    
    // While the servers current security is greater than the minimum security level, weaken the server.
    while (ns.getServerSecurityLevel(target) > minSecurity) {
        await ns.weaken(target);
    }

}