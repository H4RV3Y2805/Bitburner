import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const target = String(ns.args[0]);
  const moneyThresh = ns.getServerMaxMoney(target) * 0.8;
  const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}