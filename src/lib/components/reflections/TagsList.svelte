<script lang="ts">
    export let formData
    export let setErrors

    import { remove } from 'api/utils'

</script>
<div class="wrapper">
{#if $formData.tags}
{#each $formData.tags as tag}
    <div class="tag" on:click={()=>{
        $formData.tags = remove($formData.tags, tag)
        if ($formData.tags.length > 1){
            setErrors('oneTag', 'At least one tag must be chosen')
        }   
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
        width: 100%;
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
        font-family: Rubik, sans-serif;
    }

    .tag:hover {
        filter: brightness(.9);
    }

    span {
        font-size: 1rem;
    }
</style>