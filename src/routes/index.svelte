<script lang="ts">
    import Card from "lib/components/reflections/Card.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import Container from "lib/components/Container.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { filterReflections } from "api/Reflection";
    import { onMount } from "svelte";
    import type { Reflection } from "api/Reflection";
    import { swr } from "api/swr";

    const { dataStore } = swr(filterReflections, "indexReflections", []);
</script>

<Nav />
<SideMenu />

<main>
    <Container>
        <CenterWrapper>
            {#await $dataStore then reflectionIDs}
                {#each reflectionIDs as reflection}
                    <Card id={reflection.id} />
                {/each}
            {/await}
        </CenterWrapper>
    </Container>
</main>

<style>
    :global(body) {
        margin: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-display: swap;
        text-rendering: optimizeLegibility !important;
    }

    :global(button) {
        outline: none;
        border: 0;
    }

    main {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem;
        background: var(--bg-grey);
        /* padding-top: 4rem; */
    }
</style>
