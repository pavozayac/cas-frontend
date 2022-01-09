<script lang="ts">
    import { capitalizeFirst } from "./formUtils";

    export let errors;
    export let type: string;
    export let name: string;
    export let label: string = name;
    export let placeholder = capitalizeFirst(name).replaceAll("_", " ");
    export let stopProp: bool = false;
    export let min = undefined;
    export let max = undefined;
    export let noMargin = false;

    let value;
</script>

<div class="wrapper" class:margin={!noMargin}>
    <label class="label" for={name}>
        {capitalizeFirst(label).replaceAll("_", " ")}
    </label>
    <div class="input-wrapper">
        <input
            min={min || undefined}
            max={max || undefined}
            on:change={(e) => (value = e.target.value)}
            class:error={$errors[name]}
            {type}
            {name}
            {placeholder}
            id={name}
        />
        <slot {value} />
    </div>
</div>

<style>
    .wrapper {
        background: var(--bg-light);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        width: 100%;
    }

    .margin {
        margin-bottom: .5rem;
    }

    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .error {
        box-shadow: 0 0 0 1.5px var(--accent-red);
    }
    input {
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
        filter: brightness(0.9);
    }

    .input-wrapper {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
