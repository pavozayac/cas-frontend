<script lang="ts">
    import { menuElements } from 'lib/constants'

    export let nav = false;

</script>

<div class={`tiles-container ${!nav && "tiles-container-nonav"} ${$$props.class}`}>
    {#each menuElements as el}
        <a href="#" class="tile"><i class={el.iconType}>{el.icon}</i><span class="tile-text">{el.name}</span></a>
    {/each}
</div>

<style>
    .tiles-container {
        overflow: hidden;
        display: none;
        flex-direction: column;
        width: 14rem;
        position: fixed;
        margin-left: 4rem;
        margin-top: 7rem;
        background: transparent;
    }

    .tiles-container a {
        font-family: Rubik, sans-serif;
        font-display: swap;
        color: #444;
        outline: none;
        text-decoration: none;
    }

    .tile-text {
        margin-left: 2rem;
    }

    .tile {
        border-radius: 9999px;
        overflow: hidden;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        transition: all 300ms;
        font-size: 1rem;
        font-weight: 400;
        cursor: pointer;
    }

    .tile:hover {
        background: var(--bg-grey);
        color: var(--accent-blue);
    }



    i {
        font-size: 2rem;
        font-weight: 200;
    }

    @media screen and (min-width: 1124px) {
        .tiles-container {
            display: flex;
        }
    }
</style>