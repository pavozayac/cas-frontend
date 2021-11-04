<script lang="ts">
    import { capitalizeFirst } from "./formUtils";

    export let name: string
    export let errors
    export let formData

</script>

<div class="wrapper">
    <label class="label" for="">
        {capitalizeFirst(name).replaceAll('_', ' ')}
    </label>
    <input on:change={(e)=>{
        if ($formData.files){
            $formData.files = [...$formData.files, e.target.files[0]]
        } else {
            $formData.files = [e.target.files[0]]

        }
    }} class:error={$errors[name]} type="file" id="multipleFile"/>
</div>


<style>
    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: .5rem;
        margin-bottom: .5rem;
        width: 100%;
        overflow: hidden;
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
