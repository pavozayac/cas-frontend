<script lang="ts">
import Loading from "./components/generic/Loading.svelte";


    export let src: string
    export let alt: string

    const preload = (src) => {
        return new Promise(res=>{
            const img = new Image();
            img.onload = res
            img.src = src
        })
    }

</script>

{#await preload(src)}
    <Loading />
{:then _}
    <img {src} {alt} />
{/await}
<!-- 
<style">
    div {
        position: relative;
        height: 0;
        padding-bottom: 50%;
    }

    img {
        position: absolute;
        inset: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
    }
    
</style> -->