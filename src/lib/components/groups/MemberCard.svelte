<script lang="ts">
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc } from "api/utils";
    import Preload from "lib/Preload.svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
import Submit from "../forms/Submit.svelte";
import ProfileButton from "../generic/ProfileButton.svelte";
import InformationTile from "../generic/InformationTile.svelte";
import { deleteMember } from "api/Groups";

    export let id: number = 0;
    export let error = false;
    export let noName = false;
    export let deleteButton = true;

    let [profileData] = swr(getProfile, "profiles", [id]);
</script>

{#await $profileData then profile}
    <div class="profile-info">
        <ProfileButton id={profile.id} />
        <div class="right">
            <!-- <span class="posts">
                <span class="material-icons-round">description</span>
                {profile.reflections_count} post{profile.reflections_count == 1 ? '' : 's'}
            </span> -->
            <InformationTile transparent iconName="description">{profile.reflections_count} post{profile.reflections_count == 1 ? '' : 's'}</InformationTile>
            {#if deleteButton}
            <Submit on:click={async () => { await deleteMember(profile.group_id, profile.id)}} text="Delete member" red />
            <!-- <button class="delete">
                Delete member
                <span class="material-icons-round">logout</span>
            </button> -->
            {/if}
        </div>
    </div>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    .delete {
        display: inline-flex;
        flex-direction: row;
    }

    .posts {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

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
        transition: all 200ms;
        margin-bottom: 1rem;
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
