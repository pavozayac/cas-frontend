<script lang="ts">
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc } from "api/utils";
    import Preload from "lib/Preload.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";

    export let id: number = 0;
    export let error = false;
    export let noName = false;
    export let coordinator_id: number

    let [profileData] = swr(getProfile, "profiles", [id]);
</script>

{#await $profileData then profile}
    <div class="profile-info">
        <div class="left">
            {#if profile.avatar}
                <img
                    class="picture"
                    src={avatarSrc(profile.avatar)}
                    alt="Profile avatar"
                />
                <!-- <Preload alt="Profile picture" src={avatarSrc(profile.avatar)} /> -->
            {:else}
                <div
                    class="picture"
                    style="background: var(--bg-grey-lower);"
                />
            {/if}

            {#if !noName}
                <span class="profile-name"
                    >{profile.first_name} {profile.last_name}</span
                >
            {/if}
        </div>
        <div class="right">
            <span class="posts">
                Number of posts: {profile.reflections_count}
            </span>
            <button class="delete">
                <span class="material-icons-round">delete</span>
            </button>
        </div>
    </div>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    button {
        background: none;
        cursor: pointer;
        transition: 200ms;
        border-radius: 9999px;
        width: 3rem;
        height: 3rem;
    }

    button:hover {
        background: var(--bg-grey);
    }

    .profile-info {
        width: 100%;
        background: var(--bg-grey-lower);
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        cursor: pointer;
        transition: all 200ms;
    }

    .profile-info:hover {
        filter: brightness(.9);
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

    .left {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }

    .right {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }
</style>
