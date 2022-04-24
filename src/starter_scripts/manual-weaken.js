/** @param {NS} ns */
export async function main(ns) {
    let target = ns.getHostname()
    let securityDecrease = ns.weakenAnalyze(10)
    ns.tprint(`Weakened ${target} by ${securityDecrease}`)
}