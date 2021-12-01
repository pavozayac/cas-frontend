<script lang="ts">
    import { getGroup } from "api/Groups";

    import { swr } from "api/swr";

    export let profile_id: number;
    export let group_id: string;

    let [groupStore, reload] = swr(getGroup, "group", [group_id]);
</script>

{#await $groupStore then group}
    {#if group.coordinator_id == profile_id}
        <a href={`/groups/${group.id}/manage-group`} class="tile"
            ><i class="material-icons-round">table_chart</i>
            <span class="tile-text">Manage group</span>
        </a>
    {/if}
{/await}

<style>
    .tile-text {
        margin-left: 2rem;
    }

    .tile {
        font-family: Rubik, sans-serif;
        font-display: swap;
        color: #444;
        outline: none;
        background: inherit;
        text-decoration: none;
        border-radius: 9999px;
        overflow: hidden;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        transition: all 300ms;
        font-size: 1rem;
        font-weight: 400;
        cursor: pointer;
    }

    .tile:hover {
        filter: brightness(0.9);
        color: var(--accent-blue);
    }

    i {
        font-size: 2rem;
        font-weight: 200;
    }
</style>
