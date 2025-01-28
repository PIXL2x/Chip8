<script>
    import { instructions } from "../constants/instructions";
    import Panel from "./panel.svelte";
</script>

<Panel title={"Instructions Documentation"}>
    <div class="w-[430px] flex flex-col">
        <div class="flex flex-row gap-4 h-6">
            <div class="w-10 text-neutral-400 text-sm">Opcode</div>
            <div class="text-neutral-400 text-sm">Description</div>
        </div>

        <div class="h-[200px] overflow-y-auto border-t border-neutral-700">
            {#each instructions as instruction}
                <div class="flex flex-row gap-4">
                    <div class="w-10 text-neutral-400 text-sm">{instruction.opcode}</div>
                    <div class="text-neutral-300 text-sm">{instruction.description}</div>
                </div>
            {/each}
        </div>
    </div>
</Panel>
