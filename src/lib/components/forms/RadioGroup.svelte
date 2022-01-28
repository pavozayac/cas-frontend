<script lang="ts">
    export let items: Record<string, any>
    export let name: string
    export let text: string
    export let formData
    export let initialValue = null
</script>

<div class="container">
    {text}
    {#each Object.entries(items) as [key, value], index (value)}
        <div class="radio-wrapper" class:first={index == 0}>
            <label class="radio-label" for={value}>
                {#if value == $formData[name] || (initialValue != null && initialValue == value) }
                    <input id={value}  type="radio" name={name} value={value} checked/>
                {:else}
                    <input id={value}  type="radio" name={name} value={value} />
                {/if}
                <div class="checkmark">{key}</div>
            </label>
        </div>
    {/each}
</div>

<style>
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