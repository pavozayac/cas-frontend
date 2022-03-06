<script lang="ts">
    import { capitalizeFirst } from "./formUtils";
    import DeletableFile from "./DeletableFile.svelte";
import { attachmentSrc } from "api/utils";

    export let errors
    export let formData
    export let reflection

</script>

<div class="wrapper">
    Delete files
    <div class="files-container">
    {#each $formData.attachments as attachment}
        <DeletableFile {formData} uuid={attachment.id} filename={attachment.filename} src={attachmentSrc(reflection, attachment)}/>
    {/each}
    </div>
</div>


<style>
    .files-container {
        width: 100%;
        display: inline-flex;
    }

    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        box-sizing: border-box;
        margin-top: 1rem;
        border-radius: .5rem;
        margin-bottom: .5rem;
        width: 100%;
        overflow: hidden;
        font-family: Rubik, sans-serif;
    }

    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .error {
        box-shadow: 0 0 0 1.5px var(--accent-red);
    }
    input {
        margin-top: .5rem;
        box-sizing: border-box;
        border-radius: 9999px;
        width: 100%;
        outline: none;
        border: none;
        background: white;
        padding: 1rem 2rem;
        background: var(--bg-grey);
    }

    input:focus {
        filter: brightness(.9);
    }

</style>
