/** @param {NS} ns */
export async function main(ns) {

    // Set the target server from the input argument.
    let target = ns.args[0];
    ns.tprint('Target server: ' + target);

    // Set the value we want to hack from the target equal to the target's max money.
    let hackAmount = ns.getServerMaxMoney(target);
    let hackAmountFormatted = ns.nFormat(hackAmount, '($0.00a)');
    ns.tprint('Max Server Money: ' + hackAmountFormatted);

    // Get the number of threads reequired to hack the server for the hack amount.
    let hackThreads = ns.hackAnalyzeThreads(target, hackAmount);
    ns.tprint('Hack Threads: ' + hackThreads);

    // Get the Hack time of the target.
    let hackTime = ns.getHackTime(target);
    let hackTimeFormatted = ns.nFormat((hackTime / 1000), '00:00:00');
    ns.tprint('Hack Time: ' + hackTimeFormatted);

    // Get the weaken time of the target.
    let weakenTime = ns.getWeakenTime(target);
    let weakenTimeFormatted = ns.nFormat((weakenTime / 1000), '00:00:00');
    ns.tprint('Weaken Time: ' + weakenTimeFormatted);

    // Get the grow time of the target.
    let growTime = ns.getGrowTime(target);
    let growTimeFormatted = ns.nFormat((growTime / 1000), '00:00:00');
    ns.tprint('Grow Time: ' + growTimeFormatted);

}