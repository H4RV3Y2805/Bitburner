/** @param {NS} ns */
export async function main(ns) {

    let mode = ns.args[0]

    // Check how many servers I already have purchased.
    // Something

    let purchasedServers = ns.getPurchasedServers();
    let purchasedServersCount = purchasedServers.length;

    // Check how much money the player has.

    let playerMoney = ns.getServerMoneyAvailable("home");
    let formattedPlayerMoney = playerMoney.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // Check how many servers I can purchase by checking how much money I have and
    // dividing it by 25. 

    let maxServers = Math.floor(playerMoney / 25);
    let formattedMaxServers = maxServers.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // Check Mode.

    if (mode == "check") {
        // Print out how many servers I already have purchased.
        ns.tprint("I already have " + purchasedServersCount + " servers purchased.");
        // Print out how much money I have.
        ns.tprint("You have: " + formattedPlayerMoney + " available.");
        // Print max cost of servers.
        ns.tprint("I can purchase 25 servers with a max cost of: " + formattedMaxServers);
        // Print out a line break.
        ns.tprint(" -------------------------------------------------- ");
    }

    // Initialize a variable to hold the maximum RAM we can afford.
    let maxRAM = 0;

    // Check the costs of each server and format the result into US Dollars
    // Servers start at 2GB RAM and cost $110,000.00 increase by a power of 2 each time with a max power of 20 EG 2^20.
    for (let i = 1; i <= 20; i++) {
        // Run the price check for each power of 2.
        let serverCost = ns.getPurchasedServerCost(Math.pow(2, i))
        // Format serverCost into US Dollars
        let formattedServerCost = serverCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        // Check if the cost of the server is less than the value of 1/25th of the players money.
        // If it is, set the maxRAM to the current value of i.
        if (serverCost < maxServers) {
            maxRAM = Math.pow(2, i);
            if (mode == "check") {
                ns.tprint("A " + Math.pow(2, i) + "GB server costs: " + formattedServerCost + " and I can purchase 25 of them.")
            }
            // If it is not, print out the current value of i and the cost of the server.
        } else {
            if (mode == "check") {
                ns.tprint("A " + Math.pow(2, i) + "GB server costs: " + formattedServerCost)
            }
        }
    }

    // Print out the max RAM I can purchase.
    if (mode == "check") {
        // Print out a line break.
        ns.tprint(" -------------------------------------------------- ");
        ns.tprint(maxRAM)
    }

    // Buy mode.

    let serverPrefix = "pserv-"

    // Using the maxRAM variable, purchase 25 servers.
    if (mode == "buy") {
        if (purchasedServersCount == 0) {
            for (let i = 0; i <= 24; i++) {
                ns.purchaseServer(serverPrefix + i, maxRAM);
            }
        }
    }

    // Delete mode.

    if (mode == "delete") {
        // Delete all servers.
        for (let i = 0; i <= 24; i++) {
            ns.killall(serverPrefix + i);
            ns.deleteServer(serverPrefix + i);
        }
    }

}