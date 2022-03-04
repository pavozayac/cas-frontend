<script lang="ts">
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc, groupAvatarSrc } from "api/utils";
    import Preload from "lib/Preload.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from 'svelte/store';
    import { getGroup } from "api/Groups";
    import { fade } from 'svelte/transition';

    export let id: string;
    export let error = false;
    export let noName = false;
    export let action = () => {};
    export let icon = '';

    // let profileData: Writable<Promise<Profile>> = writable(new Promise(() => {}));

    let [groupData] = swr(
        getGroup,
        "groups",
        [id],
    );
</script>

{#await $groupData then group}
    <button on:click|preventDefault={action} type="button" class="group-info">
        {#if group.avatar}
            <img class="picture" src={groupAvatarSrc(group.avatar)} alt="Profile avatar"/>
            <!-- <Preload alt="Profile picture" src={avatarSrc(profile.avatar)} /> -->
        {:else}
            <img class="picture" src="/graphics/user.svg" alt="Profile avatar"/>
        {/if}

        {#if !noName}
            <span class="group-name"
                >{group.name}</span
            >
        {/if}

        {#if icon}
            <span class="material-icons-round">{icon}</span>
        {/if}
    </button>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    .group-info {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding: 0.3rem 0.5rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 200ms;
    }

    .group-info:hover {
        background: var(--bg-grey-lower);
    }

    .group-info .picture {
        border-radius: 9999px;
        height: 2.5rem;
        width: 2.5rem;
        object-fit: cover;
        background: var(--bg-grey-lower);
    }

    .group-name {
        max-width: 8rem;
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1rem;
        margin-left: 1rem;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-family: Rubik, sans-serif;
    }
</style>
