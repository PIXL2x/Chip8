import { writable } from "svelte/store";

const initialKeys = Array(16).fill(false);

export const keys = writable(initialKeys);
