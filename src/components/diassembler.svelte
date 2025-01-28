<script lang="ts">
    import { derived } from "svelte/store";
    import { disassembleOpcode } from "../libs/disassembler";
    import { memory } from "../stores/memory";
    import Panel from "./panel.svelte";
    import { registers } from "../stores/registers";
    import { playing } from "../stores/status";

    let container: HTMLDivElement;

    type Opcode = {
        address: number;
        b1: string;
        b2: string;
        code: string;
        argument: string;
        color: string;
    };
    let data: Opcode[] = [];

    const store = derived([registers, memory], ([$registers, $memory]) => {
        return { registers: $registers, memory: $memory };
    });

    store.subscribe((state) => {
        data = [];
        for (let i = 0x200; i < state.memory.length; i += 2) {
            let b1 = state.memory[i].toString(16).toUpperCase().padStart(2, "0");
            let b2 = state.memory[i + 1].toString(16).toUpperCase().padStart(2, "0");
            let opcode = (state.memory[i] << 8) | state.memory[i + 1];
            let [code, argument] = disassembleOpcode(opcode);
            let color = i === state.registers.PC || i - 1 === state.registers.PC ? "rgba(255, 255, 255, 0.2)" : "transparent";
            data.push({ address: i, b1, b2, code, argument, color });
        }

        if (container) {
            container.scrollTop = (state.registers.PC - 0x200) * 10;
        }
    });
</script>

<Panel title="Disassembler">
    <div class="min-w-[300px]">
        {#if $playing}
            <p class="text-neutral-400 text-sm">Disassembler is disabled while the emulator is running</p>
        {:else}
            <div class="h-[512px] overflow-y-auto" bind:this={container}>
                {#each data as { address, b1, b2, code, argument, color }}
                    <div class="px-2 flex flex-row gap-2 items-center" style="background-color: {color}">
                        <p class="w-16 text-neutral-400 text-sm">0x{address.toString(16).toUpperCase().padStart(4, "0")}</p>
                        <p class="w-4 text-neutral-100 text-sm">{b1}</p>
                        <p class="w-4 text-neutral-100 text-sm">{b2}</p>
                        <p class="ml-4 w-10 text-neutral-400 text-sm">{code}</p>
                        <p class="ml-4 w-16 text-neutral-400 text-sm">{argument}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</Panel>
