<script lang="ts">
    import { filterReflections } from "api/Reflection";
    import { swr } from "api/swr";
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import { afterUpdate, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { writable } from "svelte/store";
    import Divider from "./Divider.svelte";
    import FilterCheckboxes from "./FilterCheckboxes.svelte";
    import Select from "lib/components/generic/Select.svelte";
    import Pager from "./Pager.svelte";
    import { sortChange, filterChange } from "api/utils";
    import PlaceHolderCard from "./PlaceHolderCard.svelte";

    // export let profile_id: number;
    export let fetcher: (...args: any[]) => Promise<any>;
    export let kind: string;
    export let args: Writable<Record<any, any>>;

    let div;

    const pageStore = writable(0);

    const [reflectionsStore, reload] = swr(fetcher, kind, [$args]);
</script>

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
            change={(value) => sortChange(value, args, pageStore, reload)}
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

{#await $reflectionsStore then [reflections, count]}
    <div bind:this={div} class="posts-container">
        {#if count > 0}
            {#each reflections as reflection}
                <Card id={reflection.id} />
            {/each}
        {:else}
            <PlaceHolderCard heightRem={10} kindPlural="reflections" />
        {/if}
        <Pager {pageStore} {reload} {args} {count} />
    </div>
{/await}

<style>
    .posts-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
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
