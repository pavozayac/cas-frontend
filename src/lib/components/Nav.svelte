<script lang="ts">
    import Svg from 'svelte-inline-svg';
    import Tiles from './TileMenu.svelte';
    import { fade } from 'svelte/transition'
    import MobileMenu from './MobileMenu.svelte'

    
    let navVisible: boolean = true;
    let y1:number = 0, y2: number;
    let nav: HTMLElement;
    let navBorder: HTMLElement;

    let mouseX: number, mouseY: number;

    let tilesVisible = false;

    const maxDelta: number = 30;

    function handleMousemove (e: MouseEvent) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    $: {    
        let delta: number = y2 - y1;
        console.log(delta)
        y1 = y2;

        if(delta > maxDelta){
            navVisible = false;
            nav.style.top = "-100%";
        } else if (delta < -maxDelta || nav && (y2 < nav.clientHeight) || nav && (mouseY < nav.clientHeight)){
            navVisible = true;
            nav.style.top = "0";
        }
    }

    /*$: {
        if (y2 == 0){
            navBorder && navBorder.classList.remove("bHidden");
            navBorder && navBorder.classList.add("bShown");

        } else {
            navBorder && navBorder.classList.remove("bShown");
            navBorder && navBorder.classList.add("bHidden");
        }
    }*/


</script>

<svelte:window bind:scrollY={y2}/>
<svelte:body on:mousemove={handleMousemove} />

<nav bind:this={nav} class={`fixed flex rounded-lg md:rounded-none mx-auto w-full justify-between items-center bg-white p-4 h-16 z-20 transition-all duration-500 `}>
    <div bind:this={navBorder} class={`-z-1 absolute h-full p-4 border-b-3 border-gray-300 transition-all duration-500 ${y2 == 0 ? "w-0 left-1/2 opacity-0" : "w-full left-0"}`}></div>
    
    <div class="flex flex-row flex-shrink items-center justify-center">
        <button on:click={()=>tilesVisible = true}><span id="navIcon" class={`${tilesVisible && "invisible"} md:hidden material-icons-round`}>menu</span></button>
        <Svg src="/graphics/logo_mat.svg" class="w-32 pr-4" /> 
        <div class="logoText text-2xl text-gray-600"><span class="logoTextBold">CAS</span> Portal</div>
    </div>

    <input class="flex-grow h-full" placeholder="Search"/>
    

    <!--<div>
        <span class="logoLetters text-3xl text-blue-500">c</span>
        <span class="logoLetters text-3xl text-red-500">a</span>
        <span class="logoLetters text-3xl text-green-500">s</span>
    </div>-->

    <button class="bg-blue-500 text-white rounded-lg flex items-center justify-center focus:(bg-blue-400 outline-none) h-10 px-4 cursor-pointer hover:bg-blue-400 transition-all duration-300 text-center">
        <span id="lockIcon" class="material-icons-round">lock</span>Sign in
    </button>
    {#if tilesVisible}
    <MobileMenu on:click={()=>tilesVisible = false}/>
    
    <!--<div transition:fade={{duration: 200}}  class="fixed flex items-center justify-center left-0 top-0 w-full h-full md:hidden mx-auto bg-gray-600 bg-opacity-30">
        <button on:click={() => tilesVisible = false}><span id="closeIcon" class="fixed p-5 left-0 top-0 w-10 h-10 material-icons-round">close</span></button>
        <Tiles class="w-auto" nav={true}/>
    </div>-->
    {/if}
</nav>
 
<style lang="postcss">
    @font-face {
        font-family: Product-Sans;
        src: url("../../assets/fonts/ProductSansRegular.ttf");
    }

    @font-face {
        font-family: Product-Sans-Bold;
        src: url("../../assets/fonts/ProductSansBold.ttf");
    }
    
    button {
        font-family: Rubik, sans-serif;
        font-display: swap;
    }
    
    #lockIcon {
        @apply text-xl mr-2;
    }

    .logoText {
        font-family: Product-Sans, sans-serif;
    }

    .logoTextBold {
        font-family: Product-Sans-Bold, sans-serif;
    }

    #navIcon {
        @apply md:hidden text-3xl;
    }

    #closeIcon {
        @apply text-4xl;
    }
   
    
    
</style>