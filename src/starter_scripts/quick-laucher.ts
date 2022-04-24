import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  const scriptArgs = String(ns.args[0]);

  const host = ns.getHostname();
  const threads = threadCheck(host);

  function threadCheck(host: string) {
    const freeRAM = ns.getServerMaxRam(host) - 20 - ns.getServerUsedRam(host);
    const scriptRAM = ns.getScriptRam("early-hack-template.js", host);
    const scriptThreads = Math.floor(freeRAM / scriptRAM);
    return scriptThreads;
  }

  ns.exec("early-hack-template.js", host, threads, scriptArgs);
}
