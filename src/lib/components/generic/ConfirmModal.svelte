<script lang="ts">
    import { writable } from "svelte/store";
    import AbsoluteCenterContainer from "../AbsoluteCenterContainer.svelte";
    import Container from "../Container.svelte";
    import { fade } from 'svelte/transition';

    export let text: string;
    export let confirmText: string;
    export let denyText: string;
    // export let onConfirm: Function;

    let shown: boolean = false;

    let cb;

    function show(callback) {
        shown = true;
        cb = callback;
    }

    function yes() {
        shown = false;
        cb();
    }

    function no() {
        shown = false;
    }
</script>

<slot {shown} {show} />

{#if shown}
<div class="backdrop" on:click={no} transition:fade={{duration: 100}}>
    <div on:click|preventDefault|stopPropagation class="container">
        {text}
        <div class="buttons">
            <button class="confirm" on:click={yes}>{confirmText}</button>
            <button class="cancel" on:click={no}>{denyText}</button>
        </div>
    </div>
</div>
{/if}

<style>
    .backdrop {
        background: #00000080;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        font-family: Rubik, sans-serif;
    }


    .container {
        width: 15rem;
        background: white;
        margin: auto;
        padding: 2rem;
        border-radius: 1rem;
    }

    .buttons {
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    button {
        width: 100%;
        appearance: none;
        padding: 1rem;
        border-radius: 9999px;
        font-family: Rubik, sans-serif;
        cursor: pointer;

    }

    .confirm {
        background: var(--accent-blue);
        color: white;
    }

    .cancel {
        color: var(--accent-blue);
        background: white;
        outline: 2px solid var(--accent-blue);
    }

    button:hover {
        filter: brightness(.9);
    }


</style>
