<script lang="ts">
    import CasLogo from './cas_logo.svelte'
    

    let navVisible: boolean = true;
    let y1:number = 0, y2: number
    let nav: HTMLElement

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

    $: {
        if (y2 == 0){
            nav && nav.classList.add("underlineOff");
        } else {
            nav && nav.classList.remove("underlineOff");
        }
    }


</script>

<svelte:window bind:scrollY={y2}/>

<nav bind:this={nav} class="fixed flex rounded-lg md:rounded-none mx-auto w-full justify-between items-center bg-white p-4 h-16 z-20 transition-all duration-300">
    <CasLogo style="width: 7rem; height: 2.5rem"/>
    <button class="bg-blue-500 text-white rounded-lg flex items-center justify-center focus:bg-blue-300 h-10 px-4 cursor-pointer hover:bg-blue-400 transition-all duration-300 text-center">
        <span class="material-icons-round">lock</span>Sign in
    </button>
</nav>

<style lang="postcss">
    button {
        font-family: Rubik, sans-serif;
    }

    span {
        @apply text-xl mr-2;
    }

    

    @keyframes underlineOff {
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
        @apply border-b-8 p-4 left-0 mx-auto z-100;
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
        @apply border-b-2 p-4 left-1/2 mx-auto z-100;
    }

    
    
</style>