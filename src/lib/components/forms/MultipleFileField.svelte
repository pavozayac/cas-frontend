<script lang="ts">
import Phase from "../transitions/Phase.svelte";

    import { capitalizeFirst } from "./formUtils";

    export let name: string
    export let errors
    export let formData
    export let text = capitalizeFirst(name).replaceAll('_', ' ')
</script>

<div class="wrapper">
    <label class="label" for="multipleFile">
        {text}
    </label>
    <input on:change={(e)=>{
        console.log('dayuuum')
        // if (!!$formData.files){
        //     $formData.files = [e.target.files[0]].concat($formData.files)
        //     // $formData.files = [{bruh: 'bbb'}]
        // } else {
        //     $formData.files = [].concat(e.target.files[0])
        // }
        if ($formData.files){
            $formData.files = [e.target.files[0]].concat($formData.files)
        } else {
            $formData.files = [e.target.files[0]]
        }
    }} class:error={$errors[name]} type="file" id="multipleFile" name={name}/>
</div>


<style>
    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: .5rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
        width: 100%;
        overflow: hidden;
        font-family: Rubik, sans-serif;
    }


    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .error {
        box-shadow: 0 0 0 2px var(--accent-red);
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
