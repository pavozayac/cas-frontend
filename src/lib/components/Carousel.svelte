<script lang="ts">

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
            <svg on:click={()=>shiftOffset(-1)} id="left" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
        {:else}
            <svg></svg>
        {/if}

        {#if offset < urls.length-1}
            <svg on:click={()=>shiftOffset(1)} viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
        {:else}
            <svg></svg>
        {/if}
    </div>
    <div id="images" style={roundedImages ? 'border-radius: 0.5rem;' : ''}>
        <div id="slider" bind:this={slider} >
            {#each urls as url}
                <img style={roundedImages ? 'border-radius: 0.5rem;' : ''} alt="" src={url} />                
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
        @apply absolute flex flex-grow w-full justify-between z-10 ;
    }
    #arrows svg {
        @apply cursor-pointer w-24 h-24 rounded-full flex justify-center  px-5 fill-current text-white hover:text-red-300 ;
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