<script lang="ts">
    import KeyButton from "./key_button.svelte";
    import Panel from "./panel.svelte";
</script>

<Panel title="Virtual Keyboard">
    <div class="flex flex-col gap-2 items-center justify-center">
        <div class="flex flex-row gap-2">
            <KeyButton idx={1} key="1" />
            <KeyButton idx={2} key="2" />
            <KeyButton idx={3} key="3" />
            <KeyButton idx={12} key="C" />
        </div>
        <div class="flex flex-row gap-2">
            <KeyButton idx={4} key="4" />
            <KeyButton idx={5} key="5" />
            <KeyButton idx={6} key="6" />
            <KeyButton idx={13} key="D" />
        </div>
        <div class="flex flex-row gap-2">
            <KeyButton idx={7} key="7" />
            <KeyButton idx={8} key="8" />
            <KeyButton idx={9} key="9" />
            <KeyButton idx={14} key="E" />
        </div>
        <div class="flex flex-row gap-2">
            <KeyButton idx={10} key="A" />
            <KeyButton idx={0} key="0" />
            <KeyButton idx={11} key="B" />
            <KeyButton idx={15} key="F" />
        </div>
    </div>
</Panel>
