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
        <div class="picture" style="background: var(--bg-dark-grey);"></div>
    {:then _}
        <img class="picture" {src} {alt}/>
    {/await}


<style>
    .container {
        margin: 0;
        width: fit-content;
        height: fit-content;
    }
</style>