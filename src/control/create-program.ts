import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    ns.disableLog('sleep');
  // Do I want to focus while creating programs?
  // Yes if I don't have the augmentation, no otherwise.
  // The augmentation is Neuroreceptor Management Implant.
  const ownedAugs = ns.getOwnedAugmentations();
  let needToFocus = true;

  if (ownedAugs.includes("Neuroreceptor Management Implant") == true) {
    needToFocus = false;
  }

  // Create programs in this order:
  // AutoLink.exe: 25
  // BruteSSH.exe: 50
  // DeepscanV1.exe: 75
  // ServerProfiler.exe: 75
  // FTPCrack.exe: 100
  // relaySMTP.exe: 250
  // DeepscanV2.exe: 400
  // HTTPWorm.exe: 500
  // SQLInject.exe: 750

  while (true) {
    // Autolink.exe
    if (!ns.fileExists("Autolink.exe", "home") && !ns.isBusy()) {
      ns.createProgram("Autolink.exe", needToFocus);
    }

    // BruteSSH.exe
    if (!ns.fileExists("BruteSSH.exe", "home") && !ns.isBusy()) {
      ns.createProgram("BruteSSH.exe", needToFocus);
    }

    // DeepscanV1.exe
    if (!ns.fileExists("DeepscanV1.exe", "home") && !ns.isBusy()) {
      ns.createProgram("DeepscanV1.exe", needToFocus);
    }

    // ServerProfiler.exe
    if (!ns.fileExists("ServerProfiler.exe", "home") && !ns.isBusy()) {
      ns.createProgram("ServerProfiler.exe", needToFocus);
    }

    // FTPCrack.exe
    if (!ns.fileExists("FTPCrack.exe", "home") && !ns.isBusy()) {
      ns.createProgram("FTPCrack.exe", needToFocus);
    }

    // relaySMTP.exe
    if (!ns.fileExists("relaySMTP.exe", "home") && !ns.isBusy()) {
      ns.createProgram("relaySMTP.exe", needToFocus);
    }

    // DeepscanV2.exe
    if (!ns.fileExists("DeepscanV2.exe", "home") && !ns.isBusy()) {
      ns.createProgram("DeepscanV2.exe", needToFocus);
    }

    // HTTPWorm.exe
    if (!ns.fileExists("HTTPWorm.exe", "home") && !ns.isBusy()) {
      ns.createProgram("HTTPWorm.exe", needToFocus);
    }

    // SQLInject.exe
    if (!ns.fileExists("SQLInject.exe", "home") && !ns.isBusy()) {
      ns.createProgram("SQLInject.exe", needToFocus);
    }

    // Sleep Loop
    await ns.sleep(1000);
  }
}
