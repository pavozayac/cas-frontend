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
    import Pager from "lib/components/generic/Pager.svelte";
    import { pageLimit } from "lib/constants";
    import { writable } from "svelte/store";
    import Select from "lib/components/generic/Select.svelte";
    import FilterCheckboxes from "lib/components/generic/FilterCheckboxes.svelte";
    import Divider from "lib/components/generic/Divider.svelte";
    import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";
    import { sortChange, filterChange } from "api/utils";
    import Notifications from "lib/components/notifications/Notifications.svelte"

    export let query: Record<string, string>;

    const args = writable({
        sorts: { date_added: "desc" },
        filters: { full_text_con: query.q || undefined },
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });

    const [dataStore, reload] = swr(filterReflections, "indexReflections", [
        $args,
    ]);

    let searchPhrase = "";

    const pageStore = writable(0);

    router.subscribe((route) => {
        $args = {
            sorts: { date_added: "desc" },
            filters: { full_text_con: route.query.q ? decodeURIComponent(route.query.q) : undefined },
            pagination: {
                limit: pageLimit,
                page: 0,
            },
        };

        reload([$args]);
        searchPhrase = route.query.q ? decodeURIComponent(route.query.q) : null;

        $pageStore = 0;
    });
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <div class="filters-wrapper">
                <Divider>
                    <FilterCheckboxes
                        change={(e, value) =>
                            filterChange(e, value, args, pageStore, reload)}
                        name="categories"
                        text="Filter categories"
                        items={{
                            Creativity: {
                                creativity: true,
                            },
                            Activity: {
                                activity: true,
                            },
                            Service: {
                                service: true,
                            },
                        }}
                    />
                    <Select
                        change={(value) =>
                            sortChange(value, args, pageStore, reload)}
                        label="Sort by"
                        options={[
                            {
                                value: {
                                    date_added: "desc",
                                },
                                text: "Most recent",
                            },
                            {
                                value: {
                                    date_added: "asc",
                                },
                                text: "Least recent",
                            },
                            {
                                value: {
                                    title: "asc",
                                },
                                text: "Title A-Z",
                            },
                            {
                                value: {
                                    title: "desc",
                                },
                                text: "Title Z-A",
                            },
                        ]}
                    />
                </Divider>
            </div>

            {#if searchPhrase}
                <div class="search-phrase">
                    <h2>Searching for: {searchPhrase}</h2>
                    <a href="/" class="reset-search">
                        <span class="material-icons-round">close</span>
                    </a>
                </div>
            {/if}

            {#await $dataStore then [items, count]}
                {#if count > 0}
                    {#each items as reflection}
                        <Card id={reflection.id} />
                    {/each}
                {:else}
                    <PlaceHolderCard
                        heightRem={10}
                        style="margin-bottom: 1.25rem;"
                        kindPlural="reflections"
                    />
                {/if}

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

    .search-phrase {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .search-phrase h2 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .reset-search {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        margin-left: 1rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    .reset-search:hover {
        background: var(--bg-grey-lower);
    }

    .filters-wrapper {
        margin-bottom: 1rem;
        background: white;
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
    }
</style>
