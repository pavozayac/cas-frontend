<script lang="ts">
    import { validImageTypes } from "lib/constants";

    export let formData;

    import { remove } from "api/utils";

    function removeFile(array: Array<any>, file) {
        // let arr = []
        // for (let i = 0; i < array.length; i++) {
        //     if (array[i] == file) {
        //         array = array.splice(i + 1, 1);
        //     }
        // }
        // return array;

        let newArray = array;

        newArray.forEach((value, index) => {
            console.log(value)
            if (value == file) {
                console.log(index, file);
                newArray.splice(index, 1);
            };
        });

        return newArray;
    }

</script>

<div class="wrapper">
    {#if $formData && $formData.files}
        {#each $formData.files as file}
            <div class="file">
                {#if validImageTypes.includes(file.type)}
                    <img
                        alt="Uploaded image preview."
                        class="preview"
                        src={URL.createObjectURL(file)}
                    />
                {/if}

                <div class="label">
                    <span class="filename">{file.name}</span>
                    <button type="button" on:click={() => {
                        $formData.files = removeFile($formData.files, file);
                    }}><span class="material-icons-round">close</span></button>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .preview {  
        width: 100%;
        height: 10rem;
        /* max-width: 10rem; */
        object-fit: cover;
    }

    .filename {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 10rem;
        white-space: nowrap;
    }

    .wrapper {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        color: black;
        font-family: Rubik, sans-serif;
    }

    .label {
        padding: 1rem;
        height: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .label button {
        background: var(--accent-red);
        border-radius: 9999px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        width: 2rem;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
    }

    .label button:hover {
        filter: brightness(.9);
    }

    .file {
        width: 15rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--bg-grey);
        margin: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    span {
        font-size: 1rem;
    }
</style>
