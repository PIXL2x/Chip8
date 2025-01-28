<script lang="ts">
    import { registers } from "../stores/registers";
    import { playing } from "../stores/status";
    import EditableByte from "./editable_byte.svelte";
    import Panel from "./panel.svelte";

    let pc: number;
    let v: number[];
    let i: number;
    let sp: number;
    let dt: number;
    let st: number;

    registers.subscribe((state) => {
        pc = state.PC;
        v = state.V;
        i = state.I;
        sp = state.SP;
        dt = state.DT;
        st = state.ST;
    });

    const handleUpdatePC = (value: number, byte: number) => {
        registers.update((state) => {
            let pc = state.PC;
            if (byte === 1) {
                pc = (pc & 0x00ff) | (value << 8);
            } else {
                pc = (pc & 0xff00) | value;
            }
            state.PC = pc;
            return state;
        });
    };

    const handleUpdateI = (value: number, byte: number) => {
        registers.update((state) => {
            let i = state.I;
            if (byte === 1) {
                i = (i & 0x00ff) | (value << 8);
            } else {
                i = (i & 0xff00) | value;
            }
            state.I = i;
            return state;
        });
    };

    const handleUpdateV = (value: number, index: number) => {
        registers.update((state) => {
            state.V[index] = value;
            return state;
        });
    };

    const handleUpdateSP = (value: number) => {
        registers.update((state) => {
            state.SP = value;
            return state;
        });
    };

    const handleUpdateDT = (value: number) => {
        registers.update((state) => {
            state.DT = value;
            return state;
        });
    };

    const handleUpdateST = (value: number) => {
        registers.update((state) => {
            state.ST = value;
            return state;
        });
    };
</script>

<Panel title="Registers">
    {#if $playing}
        <p class="text-neutral-400 text-sm">Registers are disabled while the emulator is running</p>
    {:else}
        <div class="flex flex-row gap-5">
            <div class="flex flex-col">
                <div class="flex items-center">
                    <p class="w-3 text-right text-neutral-400 text-sm mr-2">PC</p>
                    <EditableByte value={(pc & 0xff00) >> 8} handleUpdate={(value) => handleUpdatePC(value, 1)} />
                    <EditableByte value={pc & 0x00ff} handleUpdate={(value) => handleUpdatePC(value, 2)} />
                </div>
                <div class="flex items-center">
                    <p class="w-3 text-right text-neutral-400 text-sm mr-2">I</p>
                    <EditableByte value={(i & 0xff00) >> 8} handleUpdate={(value) => handleUpdateI(value, 1)} />
                    <EditableByte value={i & 0x00ff} handleUpdate={(value) => handleUpdateI(value, 2)} />
                </div>
                <div class="flex items-center">
                    <p class="w-3 text-right text-neutral-400 text-sm mr-2">SP</p>
                    <EditableByte value={sp} handleUpdate={handleUpdateSP} />
                </div>
                <div class="flex items-center">
                    <p class="w-3 text-right text-neutral-400 text-sm mr-2">DT</p>
                    <EditableByte value={dt} handleUpdate={handleUpdateDT} />
                </div>
                <div class="flex items-center">
                    <p class="w-3 text-right text-neutral-400 text-sm mr-2">ST</p>
                    <EditableByte value={st} handleUpdate={handleUpdateST} />
                </div>
            </div>
            <div class="flex flex-col">
                {#each v.slice(0, 8) as value, i}
                    <div class="flex items-center">
                        <p class="w-3 text-right text-neutral-400 text-sm mr-2">V{i.toString(16).toUpperCase()}</p>
                        <EditableByte {value} handleUpdate={(value) => handleUpdateV(value, i)} />
                    </div>
                {/each}
            </div>
            <div class="flex flex-col">
                {#each v.slice(8, 16) as value, i}
                    <div class="flex items-center">
                        <p class="w-3 text-right text-neutral-400 text-sm mr-2">V{(i + 8).toString(16).toUpperCase()}</p>
                        <EditableByte {value} handleUpdate={(value) => handleUpdateV(value, i + 8)} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</Panel>
