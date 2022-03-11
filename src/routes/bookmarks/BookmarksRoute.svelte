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
    import ReflectionsList from "lib/components/generic/ReflectionsList.svelte";
    import { pageLimit } from "lib/constants";
    import Notifications from "lib/components/notifications/Notifications.svelte";

    const args = writable({
        filters: {},
        sorts: {
            date_added: "desc",
        },
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <ReflectionsList
                {args}
                fetcher={filterFavouriteReflections}
                kind="bookmarks"
            />
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
