<script lang="ts">
    import Container from "lib/components/Container.svelte";
    import { beforeUpdate, onMount } from "svelte";
    import { currentProfile, getProfile } from "api/Profile";
    import type { Profile } from "api/Profile";
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { avatarSrc } from "api/utils";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { swr } from "api/swr";
    import { filterReflections } from "api/Reflection";
    import ProfileReflections from "lib/components/generic/ReflectionsList.svelte";
    import InformationTile from "lib/components/generic/InformationTile.svelte";
    import { router } from "tinro";
    import { getGroup } from "api/Groups";


    // export let profile: Profile;
    export let meta;

    if (meta.params.id) {
        console.log("bruhbruh");
    }

    const [dataStore] = swr(getProfile, "getProfile", [Number(meta.params.id)]);

    beforeUpdate(async () => {
        try {
            let prof = await $dataStore;
        } catch (err) {
            console.log("bruhbruh");
            router.goto("/");
        }
    });

    // onMount(async () => {
    //     try {
    //         let prof = await $dataStore;
    //     } catch (err) {
    //         console.log('bruhbruh')
    //         router.goto('/')
    //     }
    // })
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#await $dataStore then profile}
                <div class="upper-data">
                    <div class="profile-info">
                        {#if profile.avatar}
                            <img
                                alt="Profile picture"
                                class="profile-icon"
                                src={avatarSrc(profile.avatar)}
                            />
                        {:else}
                            <div
                                style="background: var(--bg-grey);"
                                class="profile-icon"
                            />
                        {/if}
                        <span class="profile-name"
                            >{profile.first_name} {profile.last_name}</span
                        >
                        <div class="detail-info">
                            <InformationTile iconName={"star"} label={"Joined"}
                                >{new Date(profile.date_joined).getDate()} {new Date(profile.date_joined).toLocaleString('en-us', { month: 'short' })} {new Date(profile.date_joined).getFullYear()}</InformationTile
                            >
                            <InformationTile iconName={"create"} label={"Posts"}
                                >{profile.reflections_count }</InformationTile
                            >
                            {#if profile.group_id}
                                {#await getGroup(profile.group_id) then group}
                                    <InformationTile
                                        hoverable
                                        on:click={() => router.goto(`/groups/${profile.group_id}`)}
                                        iconName="people"
                                        label="Group"
                                        >{group.name}</InformationTile
                                    >
                                    <InformationTile
                                        iconName="school"
                                        label="Graduation"
                                        >{group.graduation_year}</InformationTile
                                    >
                                {/await}
                            {/if}
                        </div>
                    </div>
                </div>
                <ProfileReflections
                    fetcher={filterReflections}
                    kind={"currentProfileReflections"}
                    args={[
                        {
                            date_added: "desc",
                        },
                        {
                            profile_id: profile.id,
                        },
                    ]}
                />
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>

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
