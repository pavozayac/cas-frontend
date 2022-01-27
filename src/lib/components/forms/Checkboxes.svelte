<script lang="ts">
import { some } from "d3";

import { onMount } from "svelte";


    export let items: Record<string, any>
    export let name: string
    export let text: string
    // export let initialValue
    export let errors
    export let touched
    export let setError
    export let formData
    export let setInit = true;

    // console.log('inVal', initialValue)

    // onMount(() => {
    //     if (setInit) {
    //         $formData[name] = initialValue
    //         $errors = {
    //             ...$errors,
    //             categories: null
    //         }
    //     }
    // })

    // $: if ($errors[name] && $errors[name][0] && typeof $errors[name][0] == "object") {
    //     console.log("bruh", $errors[name])
    //     $errors = {
    //         ...$errors,
    //         categories: null
    //     }
    // }    
</script>

<div data-felte-reporter-tippy-position-for={`${name}_error`} />

<input name={`${name}_error`} />
<div class="container" class:error={$errors[`${name}_error`] != null && !Object.entries(items).some(([key,value]) => $touched[value] == false ) }>
    {text}
    {#each Object.entries(items) as [key, value], index (value)}
        <div class="radio-wrapper" class:first={index == 0}>
            <label class="radio-label">
            <input type="checkbox" name={value} {value} checked={$formData[value] == true} />
                <div class="checkmark">{key}</div>  
            </label>
        </div>
    {/each}
</div>

<style>
    .error {
        outline: var(--accent-red) 2px solid;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        background: var(--bg-light);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: .5rem;
    }

    .radio-wrapper {
        flex: 1;
        width: 100%;
        background: var(--bg-grey);
        border-radius: 9999px;
        box-sizing: border-box;
        margin-bottom: .5rem;
        overflow: hidden;
        cursor: pointer;
    }

    .first {
        margin-top: .5rem;
    }

    .radio-label {
        width: 100%;
    }

    .checkmark {
        width: 100%;
        padding: 1rem 2rem;
        box-sizing: border-box;
        cursor: pointer;
        transition: 100ms;
    }

    input {
        display: none;
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    input:checked + .checkmark {
        background: var(--accent-blue);
        color: white;
    }

</style>