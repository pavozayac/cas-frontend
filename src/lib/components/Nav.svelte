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
            nav && nav.classList.replace("shadow-md", "border-b-2")
        } else {
            nav && nav.classList.replace("border-b-2", "shadow-md")
        }
    }


</script>

<svelte:window bind:scrollY={y2}/>

<nav bind:this={nav} class="fixed flex rounded-lg md:rounded-none mx-auto md:w-full justify-between items-center bg-white shadow-md p-4 h-16 z-20 transition-all duration-300">
    <CasLogo style="width: 7rem; height: 2.5rem"/>
    <button class="outline-none border border-blue-500 
    text-blue-500 bg-transparent rounded-lg text-base 
    h-10 px-4 cursor-pointer hover:bg-blue-100 transition-all duration-300 text-center flex items-center justify-center">
        <span class="text-2xl material-icons-outlined">lock</span>Sign in
    </button>
</nav>

<style lang="postcss">
    span {
        @apply text-xl mr-2;
    }
    
</style>