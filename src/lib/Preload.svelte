<script lang="ts">
import { fade } from "svelte/transition";

    import Loading from "./components/generic/Loading.svelte";


    export let src: string;
    export let alt: string;
    export let img_style: string = "";
    export let height: string = "100%";

    const preload = (src) => {
        return new Promise(res=>{
            const img = new Image();
            img.onload = res;
            img.src = src;
        })
    }

</script>

    {#await preload(src)}
        <div class="picture skeleton" style={`height: ${height};`}></div>
    {:then _}
        <img in:fade class="picture" {src} {alt} style={img_style}/>
    {/await}


<style>
    .skeleton {
        background: var(--bg-grey-lower);
        opacity: 0.4;
    }

    .container {
        margin: 0;
        width: fit-content;
        height: fit-content;
    }

    .picture {
        width: 100%;
        object-fit: cover;
    }
</style>