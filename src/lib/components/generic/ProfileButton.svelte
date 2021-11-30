<script lang="ts">
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc } from "api/utils";
    import Preload from "lib/Preload.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from 'svelte/store';

    export let current = false;
    export let id: number = 0;
    export let error = false;
    export let noName = false;

    let profileData: Writable<Promise<Profile>> = writable(new Promise(() => {}));

    if (id !== null) {
        let [dataStore] = swr(
            current ? currentProfile : getProfile,
            "profiles",
            current ? [] : [id]
        );
        profileData = dataStore;
    }
</script>

{#await $profileData then profile}
    <div class="profile-info">
        {#if !noName}
            <span class="profile-name"
                >{profile.first_name} {profile.last_name}</span
            >
        {/if}

        {#if profile.avatar}
            <img class="picture" src={avatarSrc(profile.avatar)} alt="Profile avatar"/>
            <!-- <Preload alt="Profile picture" src={avatarSrc(profile.avatar)} /> -->
        {:else}
            <div class="picture" style="background: var(--bg-grey-lower);" />
        {/if}
    </div>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    .profile-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.5rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 200ms;
    }

    .profile-info:hover {
        background: var(--bg-grey);
    }

    .profile-info .picture {
        border-radius: 9999px;
        height: 3rem;
        width: 3rem;
        object-fit: fill;
    }

    .profile-name {
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1rem;
    }
</style>
