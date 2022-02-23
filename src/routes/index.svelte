<script lang="ts">
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import Container from "lib/components/Container.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { filterReflections } from "api/Reflection";
    import { onMount } from "svelte";
    import { swr } from "api/swr";
import { router } from "tinro";

    export let query: Record<string, string>;

    const [dataStore, reload] = swr(filterReflections, "indexReflections", [{date_added: 'desc'}, {full_text_con: query.q || undefined}]);

    let searchPhrase = '';

    router.subscribe(route => {
        reload([{date_added: 'desc'}, {full_text_con: route.query.q || undefined}]);
        searchPhrase = route.query.q || null;
    })

</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#if searchPhrase}
                <h2>Searching for: {searchPhrase}</h2>
            {/if}
            
            {#await $dataStore then [items, count]}
                {#each items as reflection}
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
