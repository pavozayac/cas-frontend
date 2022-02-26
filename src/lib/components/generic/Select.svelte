<script lang="ts">
    interface Option {
        value: any;
        text: string;
    }

    export let options: Option[];
    export let label: string;
    export let change: (value: any) => void;
    export let box: boolean = true;

    let selected;
</script>

<div class:box class:side-by-side={!box} class="wrapper">
    <label for="mySelect">{label}</label>
    <div class="select">
        <select bind:value={selected} on:change={() => change(selected)}  id="mySelect">
            {#each options as option}
                <option value={option.value}>{option.text}</option>
            {/each}
        </select>
        <span class="focus" />
    </div>
</div>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .wrapper {
        /* width: 100%; */
        display: flex;
        align-items: flex-start;
        justify-content: center;
        background: var(--bg-light);
        padding: .5rem 1rem;
        box-sizing: border-box;
        border-radius: .5rem;
        font-family: Rubik, sans-serif;
    }

    .box {
        flex-direction: column;
    }

    .side-by-side {
        flex-direction: row;
        align-items: center;
        gap: .5rem;
        margin-bottom: 1rem;
    }

    .side-by-side .select {
        margin-top: 0;
    }

    label {
        font-family: Rubik, sans-serif;
        display: flex;
    }

    select {
        appearance: none;
        background: transparent;
        border: none;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: Rubik, sans-serif;
        font-size: inherit;
        outline: none;
        cursor: inherit;
        line-height: inherit;
        grid-area: select;
    }

    select:focus + .focus {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 2px solid var(--accent-blue);
        border-radius: inherit;
    }

    .select {
        position: relative;
        background: var(--bg-grey);
        /* border: 1px solid var(--bg-darker-grey); */
        border-radius: 9999px;
        cursor: pointer;
        line-height: 1.1;
        min-width: 10rem;
        max-width: 20rem;
        font-size: 0.9rem;
        display: grid;
        padding: 0.5rem 1rem;
        grid-template-areas: "select";
        align-items: center;
        margin-top: .5rem;
    }

    .select::after {
        content: "";
        width: 1em;
        height: 0.7em;
        background-color: var(--bg-darker-grey);
        clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        grid-area: select;
        justify-self: end;
    }
</style>
