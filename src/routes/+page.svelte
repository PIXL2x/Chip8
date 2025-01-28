<script lang="ts">
    import Diassembler from "../components/diassembler.svelte";
    import Display from "../components/display.svelte";
    import Instructions from "../components/instructions.svelte";
    import Keyboard from "../components/keyboard.svelte";
    import MemoryEditor from "../components/memory_editor.svelte";
    import RegisterEditor from "../components/register_editor.svelte";
    import StatusBar from "../components/status_bar.svelte";
</script>

<StatusBar />
<main class="w-full p-4 flex flex-col gap-4">
    <div class="w-full flex flex-row justify-center gap-4">
        <Display />
        <Diassembler />
    </div>
    <div class="w-full flex flex-row justify-center gap-4">
        <MemoryEditor />
        <RegisterEditor />
        <Keyboard />
        <Instructions />
    </div>
</main>
