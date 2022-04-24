/** @param {NS} ns */
export async function main(ns) {

    let host = ns.args[0];

    const row = '%-20s | %-20s | %8s | %12s | %12s | %12s';
    ns.tprintf(row, 'Server', 'Parent', 'Root', 'Hack Lvl', 'Ports', 'RAM');
    ns.tprintf(row, '-------', '-------', '-------', '-------', '-------');

}