<script lang="ts">
    export let formData
    export let setFields;
    // export let validate
    // export let value
</script>

<button type="button" on:click={()=>{
    let saved
    if ($formData.oneTag != '' && $formData.oneTag.length > 2){
        if (typeof $formData.tags === 'undefined'){
            setFields('tags', [$formData.oneTag])
        } else {
            setFields('tags', [...new Set([...$formData.tags, $formData.oneTag])])
        }
    }
    
    formData.subscribe(values=>console.log(values))
}} class="add-tag-button">Add</button>

<style>
    .add-tag-button {
        font-family: Rubik, sans-serif;
        cursor: pointer;
        padding: 1rem;
        margin-left: 1rem;
        height: 100%;
        background: var(--accent-blue);
        color: white;
        border-radius: 9999px;
    }
</style>