import { writable } from "svelte/store";

const initialScreen: boolean[] = new Array(64 * 32).fill(false);

export const screen = writable(initialScreen);

export function clearScreen() {
    screen.set(new Array(64 * 32).fill(false));
}
