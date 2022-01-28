<script lang="ts">
    import { getGroup } from "api/Groups";
import { currentProfile } from "api/Profile";

    import { swr } from "api/swr";
    import { groupAvatarSrc } from "api/utils";
import { group } from "d3";
import InformationTile from "../generic/InformationTile.svelte";

    import ThinButton from "../generic/ThinButton.svelte";

    export let group_id: string;

    let [profileStore, profileReload] = swr(currentProfile, "currentProfile", []);
    let [groupStore, reload] = swr(getGroup, "group", [group_id]);
</script>

{#await $profileStore then profile}
{#await $groupStore then group}
    <div class="upper-data">
        <div class="profile-info">
            {#if group.avatar}
                <img
                    class="profile-icon"
                    src={groupAvatarSrc(group.avatar)}
                    alt="Profile picture"
                />
            {:else}
                <div style="background: red;" class="profile-icon" />
            {/if}
            <span class="profile-name">{group.name}</span>
            <div class="detail-info">
                <InformationTile style="grid-column-end: span 2;" iconName="description" label="Description">{group.description}</InformationTile>
                <InformationTile iconName="star" label="Date of creation">{new Date(group.date_created).getDate()} {new Date(group.date_created).toLocaleString('en-us', { month: 'short' })} {new Date(group.date_created).getFullYear()}
                </InformationTile>
                <InformationTile iconName="person" label="Number of members">{group.members_count}</InformationTile>
                <InformationTile iconName="create" label="Posts">{group.reflections_count}</InformationTile>
                <InformationTile iconName="school" label="Graduation year">{group.graduation_year}</InformationTile>
            </div>
        </div>
    </div>
{/await}
{/await}

<style>
    .edit-wrapper {
        width: 8rem;
    }

    .upper-data {
        background: white;
        width: 40rem;
        border-radius: 0.5rem;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-bottom: 1rem;
    }

    .profile-name {
        margin-top: 2rem;
        font-size: 2rem;
        color: var(--bg-dark-grey);
    }

    .profile-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 0.4rem 1rem;
        border-radius: 9999px;
    }

    .profile-icon {
        border-radius: 9999px;
        width: 10rem;
        height: 10rem;
        object-fit: cover;
    }

    .detail-info {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

</style>
