<script lang="ts">
import { fade } from "svelte/transition";

    import Loading from "./components/generic/Loading.svelte";


    export let src: string
    export let alt: string
    export let img_style: string = ""

    const preload = (src) => {
        return new Promise(res=>{
            const img = new Image();
            img.onload = res
            img.src = src
        })
    }

</script>

    {#await preload(src)}
        <div class="picture" style="background: var(--bg-grey-lower);"></div>
    {:then _}
        <img class="picture" {src} {alt} style={img_style}/>
    {/await}


<style>
    .container {
        margin: 0;
        width: fit-content;
        height: fit-content;
    }

    .picture {
        object-fit: cover;
    }
</style>