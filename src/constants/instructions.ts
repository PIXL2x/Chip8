export const instructions = [
    { opcode: "0x00e0", description: "Clear the display" },
    { opcode: "0x00ee", description: "Return from a subroutine" },
    { opcode: "0x1000", description: "Jump to address NNN" },
    { opcode: "0x2000", description: "Call subroutine at NNN" },
    { opcode: "0x3000", description: "Skip next instruction if Vx = NN" },
    { opcode: "0x4000", description: "Skip next instruction if Vx != NN" },
    { opcode: "0x5000", description: "Skip next instruction if Vx = Vy" },
    { opcode: "0x6000", description: "Set Vx = NN" },
    { opcode: "0x7000", description: "Set Vx = Vx + NN" },
    { opcode: "0x8000", description: "Set Vx = Vy" },
    { opcode: "0x8001", description: "Set Vx = Vx OR Vy" },
    { opcode: "0x8002", description: "Set Vx = Vx AND Vy" },
    { opcode: "0x8003", description: "Set Vx = Vx XOR Vy" },
    { opcode: "0x8004", description: "Set Vx = Vx + Vy, set VF = carry" },
    { opcode: "0x8005", description: "Set Vx = Vx - Vy, set VF = NOT borrow" },
    { opcode: "0x8006", description: "Set Vx = Vx SHR 1" },
    { opcode: "0x8007", description: "Set Vx = Vy - Vx, set VF = NOT borrow" },
    { opcode: "0x800e", description: "Set Vx = Vx SHL 1" },
    { opcode: "0x9000", description: "Skip next instruction if Vx != Vy" },
    { opcode: "0xa000", description: "Set I = NNN" },
    { opcode: "0xb000", description: "Jump to location NNN + V0" },
    { opcode: "0xc000", description: "Set Vx = random byte AND NN" },
    { opcode: "0xd000", description: "Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision" },
    { opcode: "0xe09e", description: "Skip next instruction if key with the value of Vx is pressed" },
    { opcode: "0xe0a1", description: "Skip next instruction if key with the value of Vx is not pressed" },
    { opcode: "0xf007", description: "Set Vx = delay timer value" },
    { opcode: "0xf00a", description: "Wait for a key press, store the value of the key in Vx" },
    { opcode: "0xf015", description: "Set delay timer = Vx" },
    { opcode: "0xf018", description: "Set sound timer = Vx" },
    { opcode: "0xf01e", description: "Set I = I + Vx" },
    { opcode: "0xf029", description: "Set I = location of sprite for digit Vx" },
    { opcode: "0xf033", description: "Store BCD representation of Vx in memory locations I, I+1, I+2" },
    { opcode: "0xf055", description: "Store registers V0 through Vx in memory starting at location I" },
    { opcode: "0xf065", description: "Read registers V0 through Vx from memory starting at location I" },
];
