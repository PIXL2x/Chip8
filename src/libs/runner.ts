import { get } from "svelte/store";
import { memory } from "../stores/memory";
import { registers } from "../stores/registers";
import { screen } from "../stores/screen";
import { keys } from "../stores/keys";

export const runCycle = (): void => {
    let prev_registers = { ...get(registers) };
    let prev_memory = get(memory);
    let prev_screen = [...get(screen)];
    let prev_keys = get(keys);

    if (prev_registers.DT > 0) {
        prev_registers.DT--;
    }

    const opcode = (prev_memory[prev_registers.PC] << 8) | prev_memory[prev_registers.PC + 1];

    prev_registers.PC += 2;

    const n1 = (opcode & 0xf000) >> 12;
    const n2 = (opcode & 0x0f00) >> 8;
    const n3 = (opcode & 0x00f0) >> 4;
    const n4 = opcode & 0x000f;

    const n34 = opcode & 0x00ff;
    const n234 = opcode & 0x0fff;

    if (n1 === 0x0) {
        if (opcode === 0x00e0) {
            prev_screen.fill(false);
            screen.set(prev_screen);
        } else if (opcode === 0x00ee) {
            prev_registers.SP--;
            prev_registers.PC = prev_registers.stack[prev_registers.SP];
        }
    } else if (n1 === 0x1) {
        prev_registers.PC = n234;
    } else if (n1 === 0x2) {
        prev_registers.stack[prev_registers.SP] = prev_registers.PC;
        prev_registers.SP++;
        prev_registers.PC = n234;
    } else if (n1 === 0x3) {
        if (prev_registers.V[n2] === n34) {
            prev_registers.PC += 2;
        }
    } else if (n1 === 0x4) {
        if (prev_registers.V[n2] !== n34) {
            prev_registers.PC += 2;
        }
    } else if (n1 === 0x5) {
        if (prev_registers.V[n2] === prev_registers.V[n3]) {
            prev_registers.PC += 2;
        }
    } else if (n1 === 0x6) {
        prev_registers.V[n2] = n34;
    } else if (n1 === 0x7) {
        prev_registers.V[n2] += n34;
        prev_registers.V[n2] &= 0xff;
    } else if (n1 === 0x8) {
        if (n4 === 0x0) {
            prev_registers.V[n2] = prev_registers.V[n3];
        } else if (n4 === 0x1) {
            prev_registers.V[n2] |= prev_registers.V[n3];
        } else if (n4 === 0x2) {
            prev_registers.V[n2] &= prev_registers.V[n3];
        } else if (n4 === 0x3) {
            prev_registers.V[n2] ^= prev_registers.V[n3];
        } else if (n4 === 0x4) {
            prev_registers.V[n2] += prev_registers.V[n3];
            prev_registers.V[n2] &= 0xff;
            prev_registers.V[0xf] = prev_registers.V[n2] > 0xff ? 1 : 0;
        } else if (n4 === 0x5) {
            prev_registers.V[n2] -= prev_registers.V[n3];
            prev_registers.V[n2] = prev_registers.V[n2] < 0 ? prev_registers.V[n2] + 256 : prev_registers.V[n2];
            prev_registers.V[0xf] = prev_registers.V[n2] < prev_registers.V[n3] ? 0 : 1;
        } else if (n4 === 0x6) {
            prev_registers.V[0xf] = prev_registers.V[n2] & 0x1;
            prev_registers.V[n2] >>= 1;
        } else if (n4 === 0x7) {
            prev_registers.V[n2] = prev_registers.V[n3] - prev_registers.V[n2];
            prev_registers.V[0xf] = prev_registers.V[n3] > prev_registers.V[n2] ? 1 : 0;
        } else if (n4 === 0xe) {
            prev_registers.V[0xf] = prev_registers.V[n2] >> 7;
            prev_registers.V[n2] <<= 1;
        }
    } else if (n1 === 0xa) {
        prev_registers.I = n234;
    } else if (n1 === 0xb) {
        prev_registers.PC = n234 + prev_registers.V[0];
    } else if (n1 === 0xc) {
        prev_registers.V[n2] = Math.floor(Math.random() * 256) & n34;
    } else if (n1 === 0xd) {
        const xCoord = prev_registers.V[n2];
        const yCoord = prev_registers.V[n3];
        let flipped = false;
        for (let y = 0; y < n4; y++) {
            let sprite = prev_memory[prev_registers.I + y];
            for (let x = 0; x < 8; x++) {
                if ((sprite & (0x80 >> x)) !== 0) {
                    let screenX = (xCoord + x) % 64;
                    let screenY = (yCoord + y) % 32;
                    if (prev_screen[screenY * 64 + screenX]) {
                        flipped = true;
                    }
                    prev_screen[screenY * 64 + screenX] = !prev_screen[screenY * 64 + screenX];
                }
            }
        }
        prev_registers.V[0xf] = flipped ? 1 : 0;
        screen.set(prev_screen);
    } else if (n1 === 0xe) {
        if (n34 === 0x9e) {
            if (prev_keys[prev_registers.V[n2]]) {
                prev_registers.PC += 2;
            }
        } else if (n34 === 0xa1) {
            if (!prev_keys[prev_registers.V[n2]]) {
                prev_registers.PC += 2;
            }
        }
    } else if (n1 === 0xf) {
        if (n34 === 0x07) {
            prev_registers.V[n2] = prev_registers.DT;
        } else if (n34 === 0x0a) {
            let key_pressed = false;
            for (let i = 0; i < 16; i++) {
                if (prev_keys[i]) {
                    prev_registers.V[n2] = i;
                    key_pressed = true;
                }
            }
            if (!key_pressed) {
                prev_registers.PC -= 2;
            }
        } else if (n34 === 0x15) {
            prev_registers.DT = prev_registers.V[n2];
        } else if (n34 === 0x18) {
            prev_registers.ST = prev_registers.V[n2];
        } else if (n34 === 0x1e) {
            prev_registers.I += prev_registers.V[n2];
            prev_registers.I &= 0xfff;
        } else if (n34 === 0x29) {
            prev_registers.I = prev_registers.V[n2] * 5;
            prev_registers.I &= 0xfff;
        } else if (n34 === 0x33) {
            prev_memory[prev_registers.I] = Math.floor(prev_registers.V[n2] / 100);
            prev_memory[prev_registers.I + 1] = Math.floor(prev_registers.V[n2] / 10) % 10;
            prev_memory[prev_registers.I + 2] = prev_registers.V[n2] % 10;
        } else if (n34 === 0x55) {
            for (let i = 0; i <= n2; i++) {
                prev_memory[prev_registers.I + i] = prev_registers.V[i];
            }
            memory.set(prev_memory);
        } else if (n34 === 0x65) {
            for (let i = 0; i <= n2; i++) {
                prev_registers.V[i] = prev_memory[prev_registers.I + i];
            }
        }
    }

    registers.set({ ...prev_registers });
};
