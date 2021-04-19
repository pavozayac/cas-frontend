<script lang="ts">
    import CasLogo from './cas_logo.svelte'

    let navVisible: boolean = true;
    let y1:number = 0, y2: number

    const maxDelta: number = 30;

    $: {    
        let delta: number = y2 - y1;
        console.log(delta)
        y1 = y2;

        if(delta > maxDelta){
            navVisible = false;
        } else if (delta < -maxDelta || y2 == 0){
            navVisible = true;
        }
    }

    $: onTop = y2 == 0;

</script>

<svelte:window bind:scrollY={y2}/>

<nav class="fixed flex rounded-lg md:rounded-none mx-auto md:w-full justify-between items-center bg-white shadow-md p-4 h-12 z-20 transition-all duration-500">
    <CasLogo style="width: 7rem; height: 2.5rem"/>
    <button>Sign in</button>
</nav>

<style lang="postcss">

    button {
        @apply outline-none border-double border-blue-500 
        text-blue-500 bg-transparent font-thin rounded-lg text-base 
        h-10 px-4 cursor-pointer hover:bg-blue-100 transition-all duration-300;
    }
</style>