<script lang="ts">
import { onMount } from 'svelte';


    import { capitalizeFirst } from './formUtils'

    export let errors
    export let name: string
    export let placeholder = capitalizeFirst(name).replaceAll('_', ' ')

    
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }

    onMount(()=>{
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
            tx[i].addEventListener("input", OnInput, false);
        }
    })
</script>
<div class="wrapper">
    <label class="label" for={name}>
        {capitalizeFirst(name).replaceAll('_', ' ')}
    </label>
    <textarea class:error={$errors[name]} {name} {placeholder} id={name} />
</div>

<style>
    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: .5rem;
        margin-bottom: .5rem;
    }


    textarea::placeholder {
        font-family: Rubik, sans-serif;
        font-size: .9rem;
    }

    .error {
        box-shadow: 0 0 0 1.5px var(--accent-red);
    }
    textarea {
        margin-top: .5rem;
        box-sizing: border-box;
        border-radius: 2rem;
        width: 100%;
        outline: none;
        border: none;
        background: white;
        padding: 1rem 2rem;
        background: var(--bg-grey);
        resize: vertical;
        font-family: Rubik, sans-serif;
        font-size: .9rem;   
        /* min-si */
    }

    textarea:focus {
        filter: brightness(.9);
    }

</style>