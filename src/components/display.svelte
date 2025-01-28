<script lang="ts">
    import { screen } from "../stores/screen";
    import Panel from "./panel.svelte";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    $effect(() => {
        if (!canvas) return;

        ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    screen.subscribe((state) => {
        if (!ctx) return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let scale = Math.min(canvas.width / 64, canvas.height / 32);

        for (let y = 0; y < 32; y++) {
            for (let x = 0; x < 64; x++) {
                ctx.fillStyle = state[y * 64 + x] ? "#FFFFFF" : "#000000";

                ctx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    });
</script>

<Panel title="Display">
    <canvas bind:this={canvas} width="1024" height="512"></canvas>
</Panel>
