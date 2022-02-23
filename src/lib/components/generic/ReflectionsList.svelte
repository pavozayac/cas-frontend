<script lang="ts">
    import { filterReflections } from "api/Reflection";
    import { swr } from "api/swr";
    import Card from "lib/components/reflections/ReflectionCard.svelte";

    // export let profile_id: number;
    export let fetcher: (...args: any[]) => Promise<any>
    export let kind: string
    export let args: any[]

    const [reflectionsStore, reload] = swr(fetcher, kind, args);
</script>

{#await $reflectionsStore then [reflections, count]}
    <div class="posts-container">
        {#each reflections as reflection}
            <Card id={reflection.id} />
        {/each}
    </div>
{/await}

<style>
    .posts-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
</style>
