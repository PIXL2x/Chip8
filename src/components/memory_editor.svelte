<script lang="ts">
    import { memory } from "../stores/memory";
    import EditableByte from "./editable_byte.svelte";
    import Panel from "./panel.svelte";

    const chunkSize = 16;

    type MemoryByte = {
        value: number;
        idx: number;
    };

    let data: MemoryByte[][] = [];

    export const setMemoryByte = (addr: number, value: number): void => {
        memory.update((state) => {
            state[addr] = value;
            return state;
        });
    };

    memory.subscribe((state) => {
        data = [];
        for (let i = 0; i < state.length; i += chunkSize) {
            let temp = [];
            for (let j = 0; j < chunkSize; j++) {
                let value = state[i + j];
                temp.push({ value, idx: i + j });
            }
            data.push(temp);
        }
    });

    const handleByteUpdate = (idx: number, value: number) => {
        setMemoryByte(idx, value);
    };
</script>

<Panel title="Memory Editor">
    <div class="flex flex-row">
        <p class="mr-2 w-11 h-6 text-sm text-neutral-400 text-right">Offset</p>
        {#each ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F"] as offset}
            <p class="w-6 h-6 text-sm text-center text-neutral-400 bg-transparent border-none">{offset}</p>
        {/each}
    </div>

    <div class="h-[200px] overflow-y-auto scroll-smooth border-t border-neutral-700">
        {#each data as row, i}
            <div class="flex flex-row">
                <p class="mr-2 w-11 h-6 leading-6 text-sm text-neutral-400 text-right bg-transparent border-none">
                    0x{(i * chunkSize).toString(16).toUpperCase().padStart(4, "0")}
                </p>
                {#each row as data, j}
                    <EditableByte value={data.value} handleUpdate={(value) => handleByteUpdate(data.idx, value)} />
                {/each}
            </div>
        {/each}
    </div>
</Panel>
