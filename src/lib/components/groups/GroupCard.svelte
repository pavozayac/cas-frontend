<script lang="ts">
    import { createGroupJoinRequest, getGroup } from "api/Groups";
import { currentProfile } from "api/Profile";
    import { swr } from "api/swr";
    import { groupAvatarSrc } from "api/utils";
    import { announce } from "../announcer/announcer";
    import InformationTile from "../generic/InformationTile.svelte";
import LeftCenterRightFlex from "../generic/LeftCenterRightFlex.svelte";

    export let group_id: string;
    export let manage = false;

    const [groupStore, reload] = swr(getGroup, "group", [group_id]);
    const [profileStore] = swr(currentProfile, "current", []);

    function copyCode() {
        navigator.clipboard.writeText(group_id);
    }
</script>

{#await $profileStore then profile}
{#await $groupStore then group}
    <a class="card-container" href={`/groups/${group.id}`}>
        <div class="top">
            <div class="group-icon">
                <img src={groupAvatarSrc(group.avatar)} alt="Group avatar" />
            </div>
            <div class="text-container">
                <h1 style="font-size: 1.5rem;">{group.name}</h1>
                <!-- <p>
                {group.description}
            </p> -->
            </div>
            <!-- <code on:click|preventDefault|stopPropagation class="code-container">
            {group_id}
        </code> -->
            <div class="tiles-wrapper">
                <InformationTile
                    noLabel
                    iconName="school"
                    label="Graduation"
                    compact
                >
                    {group.graduation_year}
                </InformationTile>
                <InformationTile
                    noLabel
                    on:click={copyCode}
                    iconName="group"
                    label="Members"
                    compact
                >
                    {group.members_count}
                </InformationTile>
            </div>
        </div>
        {#if manage && profile.is_admin}
        <div class="bottom">
            {#if profile.group_id == null && !profile.is_admin}
            <button on:click|preventDefault|stopPropagation={async () => {
                        try {
                            await createGroupJoinRequest(group.id);
                            announce("Successfully sent join request.");
                        } catch (err) {
                            announce("Join request has already been sent.");
                        }
                    }}
                    class="join"
                >
                <LeftCenterRightFlex>
                    <span slot="left" class="material-icons-round star-icon">star</span>
                    <span slot="center">Join</span>
                </LeftCenterRightFlex>
            </button>
            {/if}
            <a class="manage-group-button" href={`/groups/${group.id}/manage-group`}>
                <LeftCenterRightFlex>
                    <span slot="left" class="material-icons-round manage-icon">edit</span>
                    <span slot="center">Manage the group</span>
                </LeftCenterRightFlex>
            </a>
        </div>
        {/if}

        <!-- <div class="graduation-container">
        {group.graduation_year}
    </div> -->
    </a>
{/await}
{/await}

<style>
    .manage-icon, .star-icon {
        margin-left: 1rem;
        font-size: 1.2rem;
    }
    
    .star-icon {
        float: left;
    }

    .manage-group-button, .join {
        width: 100%;
        padding: .5rem;
        box-sizing: border-box;
        margin-top: 1rem;
        font-family: Rubik, sans-serif;
        outline: none;
        border-radius: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 1rem;
    }

    .join {
        color: white;
        background: var(--accent-blue);
    }

    .manage-group-button {
        background: var(--bg-grey-lower);
    }

    .manage-group-button:hover {
        filter: brightness(0.9);
    }

    .tiles-wrapper {
        display: flex;
        gap: 1rem;
        height: 100%;
    }

    .join:hover {
        filter: brightness(0.9);
    }

    .graduation-container {
        border-radius: 9999px;
        font-family: Rubik, sans-serif;
        background: var(--bg-grey);
        padding: 2rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text-container {
        width: 100%;
        margin-left: 1rem;
    }

    h1 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    p {
        text-overflow: ellipsis;
    }

    .card-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-grey);
        border-radius: 0.5rem;
        overflow: hidden;
        padding: 1rem;
        box-sizing: border-box;
    }

    .card-container:hover {
        filter: brightness(.9);
    }

    .top {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: inherit;
        /* margin-top: 1.25rem; */
        box-sizing: border-box;
    }

    img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 9999px;
        /* outline: 6px solid grey; */
    }
</style>
