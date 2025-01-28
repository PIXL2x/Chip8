import { writable } from "svelte/store";

export const playing = writable(false);
export const current_file = writable("untitled.ch8");
export const loading = writable(false);
