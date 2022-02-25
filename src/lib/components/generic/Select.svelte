<script lang="ts">
    interface Option {
        value: any;
        text: string;
    }

    export let options: Option[];
    export let label: string;
</script>

<label for="mySelect">{label}</label>
<div class="select">
    <select id="mySelect">
        {#each options as option}
            <option value={option.value}>{option.text}</option>
        {/each}
    </select>
    <span class="focus" />
</div>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    label {
        font-family: Rubik, sans-serif;
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
        background: var(--bg-grey-lower);
        /* border: 1px solid var(--bg-darker-grey); */
        border-radius: 0.5rem;
        cursor: pointer;
        line-height: 1.1;
        min-width: 10rem;
        max-width: 20rem;
        font-size: 0.9rem;
        display: grid;
        padding: 0.5rem 1rem;
        grid-template-areas: "select";
        align-items: center;
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
