<script lang="ts">
    export let items: Record<string, any>
    export let name: string
    export let text: string
    export let initialValue
    export let errors

    console.log(initialValue)
</script>

<div class="container" class:error={$errors[name] && $errors[name].length > 0}>
    {text}
    {#each Object.entries(items) as [key, value], index}
        <div class="radio-wrapper" class:first={index == 0}>
            <label class="radio-label">
                <input type="checkbox" name={name} value={value} checked={initialValue && initialValue[value] == true} />
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