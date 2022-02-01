<script lang="ts">
    import { fade } from 'svelte/transition';
    import { announcerMemory, currentNotifications } from './announcer';
    import { onDestroy } from 'svelte';


    export let text: string;

    let visible = true;

    const unsub = announcerMemory.subscribe(v => {
        setTimeout(() => {
            visible = false;
        }, 10000);
    });

    onDestroy(unsub);   
</script>

{#if visible}
<div class="notification" transition:fade={{duration: 100}}>
    {text}
    <button on:click={() => visible = false} class="close">
        <span class="material-icons-round">close</span>
    </button>
</div>
{/if}

<style>
    .notification {
        pointer-events: all;
        opacity: 0.7;
        background: #000000;
        font-family: Rubik, sans-serif;
        border-radius: .5rem;
        color: white;
        padding: 1rem;
        width: 10rem;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .close {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: none;
        color: white;
        border-radius: 9999px;
        height: 2rem;
        width: 2rem;
    }

    .close:hover {
        background: #ffffffa0;
        color: black;
    }

</style>