<script lang="ts">
import { getGroup } from "api/Groups";

    import { currentProfile } from "api/Profile";

    import { swr } from "api/swr";

    import { menuElements } from "lib/constants";
import ManageGroupButton from "./ManageGroupButton.svelte";

    export let nav = false;

    let [profileStore, reload] = swr(currentProfile, "currentProfile", []);
</script>

{#await $profileStore then profile}
    <div
        class={`tiles-container ${!nav && "tiles-container-nonav"} ${
            $$props.class
        }`}
    >
        {#each menuElements as el}
            <a href={el.target} class="tile"
                ><i class={el.iconType}>{el.icon}</i><span class="tile-text"
                    >{el.name}</span
                ></a
            >
        {/each}
        {#if profile.group_id != null}
        <a href={`/groups/${profile.group_id}`} class="tile"
            ><i class="material-icons-round">group</i>
            <span class="tile-text">Your group</span>
        </a>
        {/if}
        <ManageGroupButton group_id={profile.group_id} profile_id={profile.id} />

    </div>
{/await}

<style>
    .tiles-container {
        overflow: hidden;
        display: none;
        flex-direction: column;
        width: 14rem;
        position: fixed;
        top: 50%;
        left: 5rem;
        transform: translateY(-50%);
        background: transparent;
        background: var(--bg-grey-lower);
        padding: 1rem;
        border-radius: 1rem;
    }

    .tiles-container a {
        font-family: Rubik, sans-serif;
        font-display: swap;
        color: #444;
        outline: none;
        text-decoration: none;
    }

    .tile-text {
        margin-left: 2rem;
    }

    .tile {
        background: inherit;
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

    @media screen and (min-width: 1380px) {
        .tiles-container {
            display: flex;
        }
    }
</style>
