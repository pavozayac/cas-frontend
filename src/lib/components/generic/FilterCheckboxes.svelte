<script lang="ts">
    import { onMount } from "svelte";

    export let items: Record<string, any>;
    export let name: string;
    export let text: string;
    export let change: (e: Event, value: any) => void;
    export let icon = 'filter_alt';
    // export let initialValue
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

<div class="container">
    <div class="text-container">
        <span class="material-icons-round text-icon">{icon}</span>
        {text}
    </div>

    <div class="checks">
        {#each Object.entries(items) as [key, value], index (value)}
            <div class="radio-wrapper" class:first={index == 0}>
                <label class="radio-label">
                    <input
                        type="checkbox"
                        name={value}
                        {value}
                        checked={false}
                        on:change={
                            (e) => change(e, value)
                        }
                    />
                    <div class="checkmark">
                        <span class="material-icons-round">check_circle</span>
                        <span class="material-icons-round close">radio_button_unchecked</span>
                        {key}
                    </div>
                </label>
            </div>
        {/each}
    </div>
</div>

<style>
    .text-container {
        display: flex;
        align-items: center;
    }

    .text-icon {
        color: black;
        margin-right: .5rem;
        font-size: 1rem;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background: var(--bg-light);
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        font-family: Rubik, sans-serif;
    }

    .checks {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .radio-wrapper {
        /* width: 100%; */
        background: var(--bg-grey);
        border-radius: 9999px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
    }

    .radio-label {
        /* width: 100%; */
    }

    .checkmark {
        user-select: none;
        box-sizing: border-box;
        /* width: 100%; */
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        cursor: pointer;
        transition: 100ms;
        font-size: 0.9rem;
        font-family: Rubik, sans-serif;
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

    input:checked + .checkmark > .close {
        display: none;
    }

    .checkmark {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    span {
        margin-right: 0.5rem;
        font-size: 1.2rem;
        color: var(--bg-grey);
    }

    .close {
        position: absolute;
        color: var(--bg-darker-grey);
    }
</style>
