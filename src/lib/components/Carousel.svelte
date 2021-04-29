<script lang="ts">

    export let urls: string[];
    export let roundedImages: boolean = true;

    let slider: HTMLDivElement;
    let offset =  0;

    const shiftOffset = (dir) => {
        if((dir>0 && offset < urls.length-1) || (dir < 0 && offset > 0)) offset += dir;
    }
    
    $: if (slider) slider.style.right = `${offset*100}%`;

    function preload(src) {
        return new Promise(function(resolve) {
            let img = new Image()
            img.onload = resolve
            img.src = src
        })
    }


</script>

<div id="container">
    <div id="arrows">
        {#if offset != 0}
            <button class="items-start" on:click={()=>shiftOffset(-1)}><span class="material-icons-outlined">arrow_back</span></button>
        {:else}
            <span></span>
        {/if}

        {#if offset < urls.length-1}
            <button class="items-end" on:click={()=>shiftOffset(1)}><span class="material-icons-outlined">arrow_forward</span></button>
        {:else}
            <span></span>
        {/if}
    </div>
    <div id="images" style={roundedImages ? 'border-radius: 0.5rem;' : ''}>
        <div id="slider" bind:this={slider} >
            {#each urls as src}
                {#await preload(src) then _}
                    <img style={roundedImages ? 'border-radius: 0.5rem;' : ''} alt="" {src} />                
                {/await}
            {/each}
        </div>
        
    </div>

</div>

<style lang="postcss">
    #container {
        @apply container w-full h-full relative;
    }

    #slider  :global(img) {
        @apply w-full h-full select-none;
    }

    #images {
        @apply w-full h-full relative overflow-hidden;
    }
    
    #slider {
        @apply relative flex w-full transition-all duration-300 ease-in-out;
    }

    #arrows {
        top: 45%;
        @apply absolute flex flex-grow w-full justify-between items-center z-10 ;
    }
    #arrows button {
        @apply select-none focus:outline-none focus:(text-blue-400) md:cursor-pointer w-24 h-24 rounded-full flex justify-center items-center px-5 text-white hover:(text-blue-500 bg-grey-300) transition-all duration-300;
    }

    span {
        @apply text-6xl;
    }

    path {
        @apply cursor-pointer;
    }

    #left {
        @apply items-start transform rotate-180;
    }
    #right {
        @apply items-end ;
    }

</style>