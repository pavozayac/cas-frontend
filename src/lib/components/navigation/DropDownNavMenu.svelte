<script lang="ts">
    import { menuElements } from 'lib/constants'
    import { menuVisible } from 'stores/nav'
    import { cubicInOut } from 'svelte/easing'
    import { slide } from 'svelte/transition'

    function rollDown (node, { duration }) {

        return {
            duration,
            css: t => {
                const eased = cubicInOut(t)
                return `transform: translateY(-${100-eased*100}%)`
            }
        }
    }


</script>

{#if $menuVisible == true}
<div class="overflow-hider">
    <div transition:slide class="menu-container">
        {#each menuElements as element}
            <div class="menu-element">
                <a href="#" class="tile"><i class={element.iconType}>{element.icon}</i><span class="tile-text">{element.name}</span></a>
            </div>
        {/each}
    </div>
</div>
{/if}

<style>
    a {
        color: var(--bg-dark-grey);
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: Rubik, sans-serif;
        font-size: 1.125rem;
    }

    a > span {
        margin-left: 2rem;
    }

    .overflow-hider {
        position: absolute;
        width: 100%;
        left: 0;
        top: 1.5rem;
        z-index: -1;
        overflow: hidden;
    }

    .menu-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: var(--bg-grey-lower);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding-top: 2rem;
        transition: all 200ms;
        overflow: hidden;
    }

    .menu-element {
        width: 100%;
        padding: 1rem;
        transition: inherit;  
        background: var(--bg-grey-lower);
    }

    .menu-element:hover {
        filter: brightness(.9);
    }

    


    @media screen and (min-width: 1124px) {
        .menu-container {
            display: none;
        }
    }
</style>

