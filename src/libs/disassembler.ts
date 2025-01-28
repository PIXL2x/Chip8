/**
 * Disassembles a CHIP-8 opcode into a human-readable string.
 * @param opcode The opcode to disassemble.
 * @returns A tuple containing the disassembled opcode and its arguments.
 */
export function disassembleOpcode(opcode: number): [string, string] {
    let n1 = (opcode & 0xf000) >> 12;
    let n2 = (opcode & 0x0f00) >> 8;
    let n3 = (opcode & 0x00f0) >> 4;
    let n4 = opcode & 0x000f;

    let n34 = opcode & 0x00ff;
    let n234 = opcode & 0x0fff;

    let n1str = `${n1.toString(16).toUpperCase()}`;
    let n2str = `${n2.toString(16).toUpperCase()}`;
    let n3str = `${n3.toString(16).toUpperCase()}`;
    let n4str = `${n4.toString(16).toUpperCase()}`;

    let n34str = `0x${n34.toString(16).toUpperCase().padStart(2, "0")}`;
    let n234str = `0x${n234.toString(16).toUpperCase().padStart(3, "0")}`;

    if (n1 === 0) {
        if (n234 === 0x00e0) return ["CLS", ""];
        if (n234 === 0x00ee) return ["RET", ""];
    } else if (n1 === 1) {
        return ["JP", n234str];
    } else if (n1 === 2) {
        return ["CALL", n234str];
    } else if (n1 === 3) {
        return ["SE", `${n2str}, ${n34str}`];
    } else if (n1 === 4) {
        return ["SNE", `${n2str}, ${n34str}`];
    } else if (n1 === 5) {
        return ["SE", `${n2str}, ${n3str}`];
    } else if (n1 === 6) {
        return ["LD", `${n2str}, ${n34str}`];
    } else if (n1 === 7) {
        return ["ADD", `${n2str}, ${n34str}`];
    } else if (n1 === 8) {
        if (n4 === 0) return ["LD", `${n2str}, ${n3str}`];
        if (n4 === 1) return ["OR", `${n2str}, ${n3str}`];
        if (n4 === 2) return ["AND", `${n2str}, ${n3str}`];
        if (n4 === 3) return ["XOR", `${n2str}, ${n3str}`];
        if (n4 === 4) return ["ADD", `${n2str}, ${n3str}`];
        if (n4 === 5) return ["SUB", `${n2str}, ${n3str}`];
        if (n4 === 6) return ["SHR", `${n2str}`];
        if (n4 === 7) return ["SUBN", `${n2str}, ${n3str}`];
        if (n4 === 0xe) return ["SHL", `${n2str}`];
    } else if (n1 === 9) {
        return ["SNE", `${n2str}, ${n3str}`];
    } else if (n1 === 0xa) {
        return ["LD", `I, ${n234str}`];
    } else if (n1 === 0xb) {
        return ["JP", `V0, ${n234str}`];
    } else if (n1 === 0xc) {
        return ["RND", `${n2str}, ${n34str}`];
    } else if (n1 === 0xd) {
        return ["DRW", `${n2str}, ${n3str}, ${n4}`];
    } else if (n1 === 0xe) {
        if (n34 === 0x9e) return ["SKP", `${n2str}`];
        if (n34 === 0xa1) return ["SKNP", `${n2str}`];
    } else if (n1 === 0xf) {
        if (n34 === 0x07) return ["LD", `${n2str}, DT`];
        if (n34 === 0x0a) return ["LD", `${n2str}, K`];
        if (n34 === 0x15) return ["LD", `DT, ${n2str}`];
        if (n34 === 0x18) return ["LD", `ST, ${n2str}`];
        if (n34 === 0x1e) return ["ADD", `I, ${n2str}`];
        if (n34 === 0x29) return ["LD", `F, ${n2str}`];
        if (n34 === 0x33) return ["LD", `B, ${n2str}`];
        if (n34 === 0x55) return ["LD", `[I], ${n2str}`];
        if (n34 === 0x65) return ["LD", `${n2str}, [I]`];
    }

    return ["NOP", ""];
}
