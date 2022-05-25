import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    const augs = ns.getOwnedAugmentations();
    ns.tprint(`Augmentations: ${augs.join(', ')}`);
}