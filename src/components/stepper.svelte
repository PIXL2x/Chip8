<script lang="ts">
    import Icon from "@iconify/svelte";
    import { resetRegisters, registers } from "../stores/registers";
    import { runCycle } from "../libs/runner";
    import { clearScreen } from "../stores/screen";
    import { playing } from "../stores/status";
    import { get } from "svelte/store";

    let frequncy = $state(500);
    let mouseDrag = false;

    let slider: HTMLDivElement;
    let sliderFill: HTMLDivElement;
    let interval: number;

    const frequncyMin = 1;
    const frequncyMax = 1000;

    $effect(() => {
        const percent = (frequncy - frequncyMin) / (frequncyMax - frequncyMin);

        frequncy = Math.floor(percent * (frequncyMax - frequncyMin) + frequncyMin);

        sliderFill.style.width = `${percent * 100}%`;
    });

    const manualStep = () => {
        runCycle();
    };

    const autoStep = () => {
        if (get(playing)) {
            playing.set(false);

            if (interval) clearInterval(interval);

            resetRegisters();
            clearScreen();
        } else {
            playing.set(true);

            interval = setInterval(() => {
                runCycle();
            }, 1000 / frequncy);
        }
    };

    const pauseStep = () => {
        if (interval) {
            clearInterval(interval);
            playing.set(false);
        }
    };

    const handleSliderDragStart = () => {
        mouseDrag = true;
    };

    const handleSliderDragEnd = () => {
        mouseDrag = false;
    };

    const handleSliderDragged = (e: MouseEvent) => {
        if (!mouseDrag) return;

        if (get(playing)) {
            return;
        }

        const sliderRect = slider.getBoundingClientRect();
        const x = e.clientX - sliderRect.left;
        const percent = x / sliderRect.width;

        frequncy = Math.floor(percent * (frequncyMax - frequncyMin) + frequncyMin);

        sliderFill.style.width = `${percent * 100}%`;
    };
</script>

<div class="flex flex-row">
    <button
        title="Manual Step"
        onclick={manualStep}
        disabled={$playing}
        class="w-12 shadow-sm hover:bg-neutral-700 transition-all disabled:bg-neutral-900"
    >
        <Icon icon="mdi:step-forward" class="w-full h-[32px] text-neutral-100" />
    </button>

    <button title="Auto Step" onclick={autoStep} class="w-12 shadow-sm hover:bg-neutral-700 transition-all">
        {#if $playing}
            <Icon icon="mdi:stop" class="w-full  h-[32px] text-neutral-100" />
        {:else}
            <Icon icon="mdi:play" class="w-full  h-[32px] text-neutral-100" />
        {/if}
    </button>

    <button
        title="Pause Step"
        onclick={pauseStep}
        disabled={!$playing}
        class="w-12 shadow-sm 0 hover:bg-neutral-700 transition-all disabled:bg-neutral-900"
    >
        <Icon icon="mdi:pause" class="w-full  h-[32px] text-neutral-100" />
    </button>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="relative w-[120px] flex flex-col hover:bg-neutral-700 cursor-pointer transition-all"
        bind:this={slider}
        onmousemove={handleSliderDragged}
        onmousedown={handleSliderDragStart}
        onmouseup={handleSliderDragEnd}
    >
        <div class="absolute h-full bg-neutral-500" bind:this={sliderFill}></div>
        <p class="z-10 text-neutral-300 w-full h-full text-center text-sm leading-8 select-none">{frequncy}step/s</p>
    </div>
</div>
