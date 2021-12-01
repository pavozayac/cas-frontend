<script lang="ts">
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc } from "api/utils";
    import Preload from "lib/Preload.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from 'svelte/store';

    export let id: number = 0;
    export let error = false;
    export let noName = false;

    let [profileData] = swr(getProfile, "profiles", [id]);

</script>

{#await $profileData then profile}
    <div class="profile-info">
        {#if profile.avatar}
            <img class="picture" src={avatarSrc(profile.avatar)} alt="Profile avatar"/>
            <!-- <Preload alt="Profile picture" src={avatarSrc(profile.avatar)} /> -->
        {:else}
            <div class="picture" style="background: var(--bg-grey-lower);" />
        {/if}

        {#if !noName}
            <span class="profile-name"
                >{profile.first_name} {profile.last_name}</span
            >
        {/if}
    </div>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    .profile-info {
        width: 100%;
        background: var(--bg-grey-lower);
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 0.3rem 0.5rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 200ms;
    }

    .profile-info:hover {
        background: var(--bg-darker-grey);
    }

    .profile-info .picture {
        border-radius: 9999px;
        height: 3.5rem;
        width: 3.5rem;
        object-fit: cover;
    }

    .profile-name {
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1rem;
        text-overflow: ellipsis;
    }
</style>
