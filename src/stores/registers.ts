import { writable } from "svelte/store";

export type Registers = {
    V: number[];
    I: number;
    PC: number;
    DT: number;
    SP: number;
    ST: number;
    stack: number[];
};

const initialRegisters: Registers = {
    V: new Array(16).fill(0),
    I: 0,
    PC: 0x200,
    DT: 0,
    SP: 0,
    ST: 0,
    stack: new Array(16).fill(0),
};

export const registers = writable<Registers>(initialRegisters);

export function resetRegisters() {
    registers.set({
        V: new Array(16).fill(0),
        I: 0,
        PC: 0x200,
        DT: 0,
        SP: 0,
        ST: 0,
        stack: new Array(16).fill(0),
    });
}
