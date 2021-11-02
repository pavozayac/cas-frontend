<script lang="ts">
    function capitalizeFirst(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    export let errors
    export let type: string
    export let name: string
    export let placeholder = capitalizeFirst(name).replaceAll('_', ' ')

</script>
<div class="wrapper">
    <label class="label" for={name}>
        {capitalizeFirst(name).replaceAll('_', ' ')}
    </label>
    <input class:error={$errors[name]} {type} {name} {placeholder} id={name} />
</div>

<style>
    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: .5rem;
        margin-bottom: .5rem;
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