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

    export let query: Record<string, string>;

    let args = writable({
        sorts: {date_added: 'desc'}, 
        filters: {full_text_con: query.q || undefined},
        pagination: {
            limit: pageLimit,
            page: 0
        }
    });

    const [dataStore, reload] = swr(filterReflections, "indexReflections", [$args]);

    let searchPhrase = '';

    const pageStore = writable(0);
    

    router.subscribe(route => {
        $args = {
            sorts: {date_added: 'desc'}, 
            filters: {full_text_con: route.query.q || undefined},
            pagination: {
                limit: pageLimit,
                page: 0
            }
        };

        reload([$args]);
        searchPhrase = route.query.q || null;

        $pageStore = 0;

        
    })

</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <div class="filters">
                <Select label="Sorting" options={[
                    {
                        value: {
                            date_added: 'asc'
                        },
                        text: 'Most recent'
                    },
                    {
                        value: {
                            date_added: 'desc'
                        },
                        text: 'Least recent'
                    },
                    {
                        value: {
                            title: 'asc'
                        },
                        text: 'Title A-Z'
                    },
                    {
                        value: {
                            title: 'desc'
                        },
                        text: 'Title Z-A'
                    }
                ]}/>
            </div>

            {#if searchPhrase}
                <h2>Searching for: {searchPhrase}</h2>
            {/if}
            
            {#await $dataStore then [items, count]}
                {#each items as reflection}
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
