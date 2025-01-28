<script lang="ts">
    import { memory } from "../stores/memory";
    import Stepper from "./stepper.svelte";
    import { current_file } from "../stores/status";

    let inputRef: HTMLInputElement;
    let files: FileList | null = $state(null);

    $effect(() => {
        if (files === null) return;

        if (files.length === 0) return;

        let filename = files[0].name;
        current_file.set(filename);

        let reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target === null) return;

            let data = new Uint8Array(e.target.result as ArrayBuffer);
            memory.update((state) => {
                state.fill(0, 0x200);
                for (let i = 0; i < data.length; i++) {
                    state[i + 0x200] = data[i];
                }
                return state;
            });
        };
        reader.readAsArrayBuffer(files[0]);
    });

    const handleLoadClicked = async () => {
        inputRef.click();
    };

    const handleSaveClicked = async () => {
        // let filename = path.split("\\").pop() as string;
        // file.set(filename);

        let data = $memory.slice(0x200);
        let lastNonZeroIndex = data.length - 1;
        while (data[lastNonZeroIndex] === 0) {
            lastNonZeroIndex--;
        }
        data = data.slice(0, lastNonZeroIndex + 1);

        let tempElement = document.createElement("a");
        document.body.appendChild(tempElement);
        let blob = new Blob([new Uint8Array(data)], { type: "application/octet-stream" });
        let url = URL.createObjectURL(blob);
        tempElement.href = url;
        tempElement.download = $current_file;
        tempElement.click();
        tempElement.remove();
    };
</script>

<div class="w-full bg-neutral-800 flex flex-row items-center shadow-lg">
    <p class="mx-10 text-neutral-100 font-semibold">Chip8 Emulator</p>
    <div>
        <input type="file" id="file" class="hidden" bind:files bind:this={inputRef} />
        <button onclick={handleSaveClicked} class="px-4 py-1 text-neutral-200 hover:bg-neutral-600 transition-all">Save</button>
        <button onclick={handleLoadClicked} class="px-4 py-1 text-neutral-200 hover:bg-neutral-600 transition-all">Load</button>
    </div>
    <p class="flex-1 text-center font-semibold text-neutral-100">{$current_file}</p>
    <Stepper />
</div>
