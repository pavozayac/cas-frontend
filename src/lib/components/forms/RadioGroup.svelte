<script lang="ts">
    import { afterUpdate, beforeUpdate, onMount } from "svelte";

    export let items: Record<string, any>;
    export let name: string;
    export let text: string;
    export let formData;
    export let setFields: Function;
    export let initialValue = null;
</script>

<div class="container">
    {text}
    {#each Object.entries(items) as [key, value], index (value)}
        <div class="radio-wrapper" class:first={index == 0}>
            <label class="radio-label" for={value}>
                {#if (initialValue != null && initialValue == String(value)) || value == $formData[name]}
                    <input id={value} type="radio" {name} {value} checked />
                {:else}
                    <input id={value} type="radio" {name} {value} />
                {/if}
                <div class:checked={value == $formData[name]} class="checkmark">
                    <span class="material-icons-round">
                        {#if value == $formData[name]}
                            radio_button_checked
                        {:else}
                            radio_button_unchecked
                        {/if}
                    </span>
                    {key}
                </div>
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
        border-radius: 0.5rem;
        font-family: Rubik, sans-serif;
    }

    .radio-wrapper {
        flex: 1;
        width: 100%;
        background: var(--bg-grey);
        border-radius: 9999px;
        box-sizing: border-box;
        margin-bottom: 0.5rem;
        overflow: hidden;
        cursor: pointer;
    }

    .first {
        margin-top: 0.5rem;
    }

    .radio-label {
        width: 100%;
    }

    .checkmark {
        width: 100%;
        padding: 1rem 1rem;
        box-sizing: border-box;
        cursor: pointer;
        transition: 100ms;
        display: flex;
    }

    .checkmark span {
        margin-right: 1rem;
    }

    input {
        display: none;
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .checked {
        background: var(--accent-blue);
        color: white;
    }
</style>
