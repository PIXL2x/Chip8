<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        title: string;
        children: Snippet;
    };

    let { title, children }: Props = $props();
</script>

<div class="flex flex-col bg-neutral-800 rounded-md shadow-lg border border-neutral-700">
    <div class="bg-neutral-700 p-1 rounded-t-md">
        <h3 class="text-neutral-400 text-sm font-bold ml-2">{title}</h3>
    </div>
    <div class="p-2 flex flex-col">
        {@render children()}
    </div>
</div>
