<script lang="ts">
import Preload from "lib/Preload.svelte";


    export let urls: string[];
    export let roundedImages: boolean = true;

    let slider: HTMLDivElement;
    let offset =  0;

    const shiftOffset = (dir) => {
        if((dir>0 && offset < urls.length-1) || (dir < 0 && offset > 0)) offset += dir;
    }
    
    $: if (slider) slider.style.right = `${offset*100}%`;


</script>

<div id="container">
    <div id="arrows">
        {#if offset != 0}
            <button class="arrow-back" on:click={()=>shiftOffset(-1)}><span class="material-icons-outlined">arrow_back</span></button>
        {:else}
            <span></span>
        {/if}

        {#if offset < urls.length-1}
            <button class="arrow-forward" on:click={()=>shiftOffset(1)}><span class="material-icons-outlined">arrow_forward</span></button>
        {:else}
            <span></span>
        {/if}
    </div>
    <div id="images" style={roundedImages ? 'border-radius: 0.5rem;' : ''}>
        <div id="slider" bind:this={slider} >
            {#each urls as src}
                <Preload img_style="max-height: 30rem;" height="30rem" alt="Reflection evidence" {src} />
            {/each}
        </div>
        
    </div>

</div>

<style>

    #container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #slider > :global(img) {
        width: 100%;
        height: 100%;
        min-width: 100%;
    }

    #images {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    
    #slider {
        position: relative;
        display: flex;
        transition: all 300ms ease-in-out;
    }

    #arrows {
        position: absolute;
        display: flex;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
    }
    #arrows button {
        background: transparent;
        opacity: 0.6;
        width: 6rem;
        height: 100%;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        color: white;
        transition: all 300ms;
        cursor: pointer;
    }

    #arrows button:focus {
        outline: none;
    }
    
    #arrows button:hover {
        background: #777;
    }

    .arrow-forward {
        align-items: flex-end;
    }

    .arrow-back {
        align-items: flex-start;
    }

    span {
        font-size: 3.75rem; /* 60px */
    }

    /*path {
        cursor: pointer;
    }*/

</style>