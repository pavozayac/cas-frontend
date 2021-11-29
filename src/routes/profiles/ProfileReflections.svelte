<script lang="ts">
    import { filterReflections } from "api/Reflection";
    import { swr } from "api/swr";
    import Card from "lib/components/reflections/Card.svelte";

    export let profile_id: number;

    const [reflectionsStore, reload] = swr(filterReflections, "reflections", [
        {date_added: 'desc'},
        {},
    ]);
</script>

{#await $reflectionsStore then reflections}
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
