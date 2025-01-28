import { writable } from "svelte/store";
import { fontset } from "../constants/fonts";

let initialMemory: number[] = new Array(4096).fill(0);
for (let i = 0; i < fontset.length; i++) {
    initialMemory[i] = fontset[i];
}

export const memory = writable(initialMemory);
