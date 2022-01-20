<script lang="ts">
import { remove } from 'api/utils';

    import { validImageExtensions } from 'lib/constants'
    import { writable } from 'svelte/store';

    export let src: string;
    export let uuid: string;
    export let filename: string;
    export let formData;

    let checked = writable(false);

    function changeChecked (){
        $checked = !$checked;
        if ($checked == true && !$formData.delete_uuids.includes(uuid)) {
            $formData.delete_uuids = [uuid].concat($formData.delete_uuids);
        } else {
            $formData.delete_uuids = remove($formData.delete_uuids, uuid);
        }
    }

</script>

<div class="file" class:to-delete={$checked}>
    {#if true || validImageExtensions.includes(src.split('.').pop())}
        <img
            alt="Uploaded image preview."
            class="preview"
            src={src}
        />
    {/if}

    <div class="label">
        <button on:click={changeChecked}><span class="material-icons-round">close</span></button>
    </div>
</div>


<style>
    .to-delete {
        outline: 2px solid var(--accent-red);
    }

    .preview {
        width: 100%;
        height: 10rem;
        max-width: 10rem;
        object-fit: cover;
        background: white;
    }

    .wrapper {
        display: flex;
        width: 30rem;
        flex-wrap: wrap;
        color: white;
    }

    .label {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: var(--accent-blue);

    }

    .label button {
        background: none;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .file {
        background: white;
        display: flex;
        width: 40%;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    span {
        font-size: 1rem;
    }
</style>
