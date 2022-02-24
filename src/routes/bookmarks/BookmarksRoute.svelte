<script lang="ts">
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import Container from "lib/components/Container.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import {
        filterFavouriteReflections,
        filterReflections,
    } from "api/Reflection";
    import { onMount } from "svelte";
    import type { Reflection } from "api/Reflection";
    import { swr } from "api/swr";
    import { writable } from "svelte/store";
import Pager from "lib/components/generic/Pager.svelte";

    const args = writable({
        filters: {},
        sorts: {
            date_added: "desc",
        },
    });

    const pageStore = writable(0);

    const [dataStore, reload] = swr(filterFavouriteReflections, "bookmarks", [$args]);
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#await $dataStore then [reflections, count]}
                {#each reflections as reflection}
                    <Card id={reflection.id} />
                {/each}
                <Pager {args} {count} {reload} {pageStore} />
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
