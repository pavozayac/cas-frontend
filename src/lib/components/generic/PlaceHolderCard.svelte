<script lang="ts">
    export let heightRem: number;
    export let kindPlural: string = 'results';
    export let loading = false;
    export let style: string = '';
</script>

<div class="card" style={`height: ${heightRem}rem; ${style}`}>
    {#if !loading}
        <span class="material-icons-round">search_off</span>
        
        No {kindPlural} found.
    {/if}
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: .5rem;
        background: var(--bg-grey);
        font-family: Rubik, sans-serif;
    }
</style>