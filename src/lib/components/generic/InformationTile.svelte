<script lang="ts">
    export let label: string = "";
    export let iconName: string
    export let style = "";
    export let hoverable = false;
    export let noLabel = false;
    export let transparent = false;

</script>

<div class:transparent class:non-transparent={!transparent} class:hoverable class:nonhoverable={!hoverable} on:click|preventDefault|stopPropagation class="tile" {style}>
    <div class="icon-section">
        <span class="material-icons-round icon">{iconName}</span>
    </div>
    <div class="info-section">
        {#if !noLabel}
        <span class="label">{label}</span>
        {/if}
        <span class="info"><slot></slot></span>
    </div>
</div>

<style>
    .transparent {
        background: transparent;
    }

    .non-transparent {
        background: var(--bg-light);
    }

    .hoverable {
        cursor: pointer;
    }

    .nonhoverable {
        cursor: auto;
    }

    .hoverable:hover {
        filter: brightness(.9);
    }

    .tile {
        width: 100%;
        padding: 1rem 2rem;
        border-radius: .5rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
    }

    .icon-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .icon {
        font-size: 2rem;
        width: 3rem;
    }

    .info-section {
        width: 100%;
        font-size: 1.2rem;
        /* text-align: center; */
        /* color: var(--bg-dark-grey);  */
        font-family: Rubik, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .label {
        font-weight: 500;
        /* height: 1rem; */
        width: 100%;
        text-align: left;
        font-size: .9rem;
    }

    .info {
        /* font-weight: 500; */
        padding: 1rem 0;
        width: 100%;
        text-align: left;
    }
</style>