<script lang="ts">
    export let text: string
    export let container = true;
    export let green = false;
    export let red = false;
    // export let action: () => void = null;
</script>
<!-- {#if action}
    {#if container}
    <div class="container">
        <button on:click={action} class:green class:red type="submit" value={text} />
    </div>
    {:else}
    <button on:click={action} class:green class:red type="submit" value={text} />
    {/if}
{:else} -->
    {#if container}
    <div class="container">
        <input on:click class:green class:red type="submit" value={text} />
    </div>
    {:else}
    <input on:click class:green class:red type="submit" value={text} />
    {/if}
<!-- {/if} -->


<style>
    .container {
        display: flex;
        justify-content: center;
    }
    
    input, button {
        font-family: Rubik, sans-serif;
        border-radius: 9999px;
        outline: none;
        border: none;
        color: white;
        font-size: 1rem;
        padding: 1rem 2rem;
        background-color: var(--accent-blue);
        cursor: pointer;
    }

    .red {
        background-color: var(--accent-red);
    }

    .green {
        background-color: var(--accent-green);
    }
</style>