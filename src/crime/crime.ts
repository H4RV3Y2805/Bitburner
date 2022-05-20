import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    //Which crime to do?
    const crime = String(ns.args[0]);

    while (!ns.isBusy()) {
    let crimeWait = Number(ns.commitCrime(crime));
        if (crimeWait < 30000) {
            crimeWait = 30000;
        }
        await ns.sleep(crimeWait * 2);
    }


}