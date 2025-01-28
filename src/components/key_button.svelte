<script lang="ts">
    import { keys } from "../stores/keys";

    const handleKeyDown = (key: number) => {
        keys.update((state) => {
            state[key] = true;
            return state;
        });
    };

    const handleKeyUp = (key: number) => {
        keys.update((state) => {
            state[key] = false;
            return state;
        });
    };

    type Props = {
        idx: number;
        key: string;
    };

    let { idx, key }: Props = $props();
</script>

<button
    class="w-10 h-10 bg-neutral-600 text-neutral-100 rounded-md hover:bg-neutral-500 active:bg-neutral-300 transition-all"
    onmousedown={() => handleKeyDown(idx)}
    onmouseup={() => handleKeyUp(idx)}
>
    {key}
</button>
