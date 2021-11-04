<script lang="ts">
    export let formData

    import { remove } from 'api/utils'

    function removeFile(array, name) {
        // let arr = []
        for (let i = 0; i < array.length; i++){
            if (array[i].name == name){
                array = array.splice(i+1, 1)
            }
        }
        return array
    }

</script>
<div class="wrapper">
{#if $formData.files}
{#each $formData.files as file}
    <div class="file" on:click={()=>{
        $formData.files = removeFile($formData.files, file.name)    
    }}>
        {file.name}
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

    .file {
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