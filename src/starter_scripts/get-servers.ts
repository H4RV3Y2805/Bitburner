import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  // Define the column layout.

  ns.tprint("\n\n");
  const row = "%-20s | %-20s | %8s | %12s | %12s | %12s | %12s ";
  ns.tprintf(
    row,
    "Server",
    "Parent",
    "Rooted",
    "Hack Lvl",
    "Ports",
    "RAM",
    "Max Money"
  );
  ns.tprintf(
    row,
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------",
    "-------"
  );

  // Loop through our servers and print out their information.
  const allServers = ["home"];

  for (let i = 0; i < allServers.length; i++) {
    // This server is the current index we're working on.
    const thisServer = allServers[i];
    // Get the parent of this server.
    let parentServer = "";
    if (thisServer == "home") {
      parentServer = "";
    } else {
      parentServer = ns.scan(allServers[i])[0];
    }
    // Initialize the output variables.
    const rooted = ns.hasRootAccess(allServers[i]);
    const hackingLevel = ns.getServerRequiredHackingLevel(allServers[i]);
    const portsRequired = ns.getServerNumPortsRequired(allServers[i]);
    const ram = ns.nFormat(
      ns.getServerMaxRam(allServers[i]) * 1000 * 1000 * 1000,
      "0 b"
    );
    const maxMoney = ns.nFormat(
      ns.getServerMaxMoney(allServers[i]),
      "($ 0.00 a)"
    );

    // Add the data to the server table.
    ns.tprintf(
      row,
      thisServer,
      parentServer,
      rooted,
      hackingLevel,
      portsRequired,
      ram,
      maxMoney
    );

    // Scan this server for children.
    const foundServer = ns.scan(allServers[i]);

    // Remove the parent server from the array.
    if (thisServer != "home") {
      foundServer.splice(0, 1);
    }

    // If the resulting arrays length is greater than 1 (meaning it can see another tier of server)
    if (foundServer.length > 0) {
      // Add each item in the array to the allServers array if it doesn't already exist.
      for (let j = 0; j < foundServer.length; j++) {
        if (allServers.indexOf(foundServer[j]) == -1) {
          allServers.push(foundServer[j]);
        }
      }
    }
  }
}
