<script lang="ts">
    type Props = {
        value: number;
        handleUpdate?: (value: number) => void;
    };

    let { value, handleUpdate }: Props = $props();

    let inputRef: HTMLInputElement;
</script>

<input
    type="text"
    class="w-6 h-6 text-sm text-center bg-transparent border-none text-white"
    value={value.toString(16).toUpperCase().padStart(2, "0")}
    bind:this={inputRef}
    onchange={(_) => {
        if (!/^[0-9A-Fa-f]{2}$/.test(inputRef.value)) {
            inputRef.value = "00";
            return;
        }

        inputRef.value = inputRef.value.toUpperCase();

        if (handleUpdate) {
            handleUpdate(parseInt(inputRef.value, 16));
        }
    }}
/>
