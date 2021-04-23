<script lang="ts">
    import CasLogo from './cas_logo.svelte'
    

    let navVisible: boolean = true;
    let y1:number = 0, y2: number
    let nav: HTMLElement
    let navBorder: HTMLElement

    const maxDelta: number = 30;

    $: {    
        let delta: number = y2 - y1;
        console.log(delta)
        y1 = y2;

        if(delta > maxDelta){
            navVisible = false;
            nav.style.top = "-100%";
        } else if (delta < -maxDelta || y2 == 0){
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

<nav bind:this={nav} class={`fixed flex rounded-lg md:rounded-none mx-auto w-full justify-between items-center bg-white p-4 h-16 z-20 transition-all duration-500 `}>
    <div bind:this={navBorder} class={`absolute h-full p-4 border-b-3 transition-all duration-500 ${y2 == 0 ? "w-0 left-1/2 opacity-0" : "w-full left-0"}`}></div>
    <CasLogo style="width: 7rem; height: 2.5rem"/>
    <button class="bg-blue-500 text-white rounded-lg flex items-center justify-center focus:(bg-blue-400 outline-none) h-10 px-4 cursor-pointer hover:bg-blue-400 transition-all duration-300 text-center">
        <span class="material-icons-round">lock</span>Sign in
    </button>
</nav>
 
<style lang="postcss">
    button {
        font-family: Rubik, sans-serif;
        font-display: swap;
    }

    span {
        @apply text-xl mr-2;
    }

    @keyframes hide {
        to {
            @apply w-0 left-1/2;
        }
    }

    .bHidden {
        width: 100%;
        animation: hide 2s forwards;
    }

    @keyframes show {
        to {
            @apply w-full left-0;
        }
    }

    .bShown {
        animation: show 2s forwards;
        @apply w-0 left-1/2;
    }

    

    /*@keyframes underlineOff {
        to {
            width: 0%;
            @apply left-1/2;
        }
    }

    nav.underlineOff::before {
        content: "";
        position: absolute;
        width: 0%;
        height: 100%;
        //animation: underlineOff 500ms forwards;
        @apply border-b-8 p-4 left-0 mx-auto;
    }

    @keyframes underlineOn {
        to {
            width: 100%;
            @apply left-0;
        }
    }

    nav::before {
        content: "";
        position: absolute;
        width: 0%;
        height: 100%;
        animation-name: underlineOn;
        animation-fill-mode: forwards;
        animation-duration: 500ms;
        @apply border-b-2 p-4 left-1/2 mx-auto;
    }*/

    
    
</style>