<script lang="ts">
    export let text: string
    export let container = true
</script>
{#if container}
<div class="container">
    <input type="submit" value={text} />
</div>
{:else}
<input type="submit" value={text} />
{/if}


<style>
    .container {
        display: flex;
        justify-content: center;
    }
    
    input {
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
</style>