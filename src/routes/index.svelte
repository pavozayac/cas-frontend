<script lang="ts">
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import Container from "lib/components/Container.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { filterReflections } from "api/Reflection";
    import { onMount } from "svelte";
    import { swr } from "api/swr";

    const [dataStore] = swr(filterReflections, "indexReflections", [{date_added: 'desc'}, {}]);
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#await $dataStore then reflectionIDs}
                {#each reflectionIDs as reflection}
                    <Card id={reflection.id} />
                {/each}
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>

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
</style>
