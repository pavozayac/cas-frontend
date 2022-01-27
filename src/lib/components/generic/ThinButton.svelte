<script lang="ts">
    export let target: string = null
    export let action = null
    export let fullIconName: string = ''
    export let text: string
    export let style: string = ''
</script>

{#if target}
<a href={target} {style}>
    {#if fullIconName}
        <span class="material-icons-round">{fullIconName}</span>
    {/if}
    <span class="text">{text}</span>
</a>
{:else}
<button on:click={action} {style}>
    {#if fullIconName}
        <span class="material-icons-round">{fullIconName}</span>
    {/if}
    <span class="text">{text}</span>
</button>
{/if}

<style>
    a, button {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem;
        font-family: Rubik, sans-serif; 
        background: transparent; 
        /* margin-bottom: 1rem; */
        border-radius: 9999px;
        cursor: pointer;
        /* width: auto; */
        /* width: fit-content; */
    }   

    a:hover {
        background: var(--bg-grey-lower);
    }

    button:hover {
        background: var(--bg-grey-lower);
    }

    span {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }

    .text {
        font-size: .9rem;
    }
    
</style>