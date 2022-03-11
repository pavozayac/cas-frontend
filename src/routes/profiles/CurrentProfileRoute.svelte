<script lang="ts">
    import Container from "lib/components/Container.svelte";
    import { onMount } from "svelte";
    import { currentProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { avatarSrc } from "api/utils";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { swr } from "api/swr";
    import { filterReflections } from "api/Reflection";
    import ProfileReflections from "../../lib/components/generic/ReflectionsList.svelte";
    import InformationTile from "lib/components/generic/InformationTile.svelte";
    import { getGroup } from "api/Groups";
    import { writable } from "svelte/store";
    import { pageLimit } from "lib/constants";
    import Notifications from "lib/components/notifications/Notifications.svelte"

    export let profile: Profile;

    const args = writable({
        sorts: {
            date_added: "desc",
        },
        filters: {
            profile: {
                id: profile.id,
            },
        },
        pagination: {
            page: 0,
            limit: pageLimit,
        },
    });
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <div class="upper-data">
                <div class="edit-wrapper">
                    <ThinButton
                        text="Edit profile"
                        target="/profiles/current/edit"
                        fullIconName="edit"
                    />
                </div>
                <div class="profile-info">
                    {#if profile.avatar}
                        <img
                            alt="Profile picture"
                            class="profile-icon"
                            src={avatarSrc(profile.avatar)}
                        />
                    {:else}
                        <img
                            alt="Profile picture"
                            class="profile-icon"
                            src="/graphics/user.svg"
                        />
                    {/if}
                    <h1>
                        {profile.first_name}
                        {profile.last_name}
                    </h1>
                    <div class="detail-info">
                        <InformationTile iconName={"star"} label={"Joined"}
                            >{new Date(profile.date_joined).getDate()}
                            {new Date(profile.date_joined).toLocaleString(
                                "en-us",
                                { month: "short" }
                            )}
                            {new Date(
                                profile.date_joined
                            ).getFullYear()}</InformationTile
                        >
                        <InformationTile iconName={"create"} label={"Posts"}>
                            {#await filterReflections( { sorts: {}, filters: { profile: { id: profile.id } } } ) then [reflections, count]}
                                {count}
                            {/await}
                        </InformationTile>
                        {#await getGroup(profile.group_id) then group}
                            <InformationTile iconName="people" label="Group"
                                >{group.name}</InformationTile
                            >
                            <InformationTile
                                iconName="school"
                                label="Graduation"
                                >{group.graduation_year}</InformationTile
                            >
                        {/await}
                    </div>
                </div>
            </div>
            <ProfileReflections
                fetcher={filterReflections}
                kind={"currentProfileReflectionsNew"}
                {args}
            />
        </CenterWrapper>
    </Container>
</CenterWrapper>

<style>
    .edit-wrapper {
        width: 8rem;
    }

    .upper-data {
        background: white;
        width: 100%;
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

    .profile-info img {
        background: var(--bg-grey-lower);
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
