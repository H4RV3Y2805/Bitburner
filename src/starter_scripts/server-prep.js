/** @param {NS} ns */
export async function main(ns) {

    // This script's task is to get a server ready for batching.
    // This is done buy growing the server to the Max Server Money
    // and also weakening the server to the minimum security level.

    // We need a target, get this from the arguments.
    let target = ns.args[0];

    // Get the max money of the target server.
    let maxMoney = ns.getServerMaxMoney(target);

    

}