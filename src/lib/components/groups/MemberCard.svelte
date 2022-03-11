<script lang="ts">
    import { currentProfile, getProfile, deleteProfile as deleteProf } from "api/Profile";
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
    import ConfirmModal from "../generic/ConfirmModal.svelte";
import { announce } from "../announcer/announcer";

    export let id: number = 0;
    export let error = false;
    export let noName = false;
    export let deleteButton = true;
    export let deleteProfile = false;
    export let reload: Function = () => {};

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
            {#if profile.is_admin}
            <InformationTile compact transparent iconName="supervisor_account"
                >Administrator</InformationTile
            >
            {/if}
            <InformationTile compact transparent iconName="description"
                >{profile.reflections_count} post{profile.reflections_count == 1
                    ? ""
                    : "s"}</InformationTile
            >
            {#if deleteButton && !deleteProfile && !profile.is_admin}
                <ConfirmModal
                    let:show
                    text="Do you want to remove this user from the group?"
                    confirmText="Remove"
                    denyText="Cancel"
                >
                    <button
                        class="remove"
                        on:click={() =>
                            show(async () => {
                                try{
                                    await deleteMember(
                                        profile.group_id,
                                        profile.id
                                    );
                                    announce('Successfully removed from group.')
                                } catch (err) {
                                    announce('Error: could not remove user')
                                }
                            })}
                    >
                        <span class="material-icons-round">person_remove</span>
                        Remove
                    </button>
                </ConfirmModal>
                <!-- <button class="delete">
                Delete member
                <span class="material-icons-round">logout</span>
            </button> -->
            {/if}
            {#if deleteProfile && !deleteButton && !profile.is_admin}
                <ConfirmModal
                    let:show
                    text="Do you want to delete this user? This will be permanent."
                    confirmText="Delete"
                    denyText="Cancel"
                >
                    <button
                        class="remove"
                        on:click={() =>
                            show(async () => {
                                try {
                                    await deleteProf(profile.id);
                                    announce('Successfully deleted profile.')
                                    reload();
                                } catch (err) {
                                    announce('Error: could not delete profile.')
                                }
                            })}
                    >
                        <span class="material-icons-round">person_remove</span>
                        Delete
                    </button>
                </ConfirmModal>
            {/if}
        </div>
    </div>
{:catch err}
    {#if error}
        <slot />
    {/if}
{/await}

<style>
    .remove {
        display: inline-flex;
        flex-direction: row;
        padding: 1rem 1rem;
        border-radius: 9999px;
        justify-content: center;
        align-items: center;
        font-family: Rubik, sans-serif;
        background: var(--accent-red);
        color: white;
        cursor: pointer;
        font-size: 1rem;
    }

    .remove:hover {
        filter: brightness(0.9);
    }

    .remove span {
        font-size: 1.2rem;
        margin-right: 0.5rem;
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
        border-radius: 0.5rem;
        transition: all 200ms;
        /* margin-bottom: 1rem; */
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
