<script lang="ts">
    export let formData

    import { remove } from 'api/utils'

</script>
<div class="wrapper">
{#if $formData.tags}
{#each $formData.tags as tag}
    <div class="tag" on:click={()=>{
        $formData.tags = remove($formData.tags, tag)    
    }}>
        {tag}
        <span class="material-icons-round">close</span>
    </div>
{/each}
{/if}
</div>

<style>
    .wrapper {
        display: flex;
        width: 40rem;
        flex-wrap: wrap;
        color: white;
    }

    .tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 2rem;
        background: var(--accent-blue);
        padding: .3rem 1rem;
        margin: .5rem;
        border-radius: 9999px;
        cursor: pointer;
    }

    span {
        font-size: 1rem;
    }
</style>