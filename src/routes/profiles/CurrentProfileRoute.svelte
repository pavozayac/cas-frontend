<script lang="ts">
    import Container from "lib/components/Container.svelte";
    import { onMount } from "svelte";
    import { currentProfile } from "api/Profile";
    import Card from "lib/components/reflections/ReflectionCard.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import { avatarSrc } from "api/utils";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { swr } from "api/swr";
    import { filterReflections } from "api/Reflection";
    import ProfileReflections from "./ProfileReflections.svelte";

    const [dataStore] = swr(currentProfile, "currentProfile", []);
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#await $dataStore then profile}
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
                            <div
                                style="background: red;"
                                class="profile-icon"
                            />
                        {/if}
                        <span class="profile-name"
                            >{profile.first_name} {profile.last_name}</span
                        >
                        <div class="detail-info">
                            <div class="tile">Joined {profile.date_joined}</div>
                            <div class="tile">Posted {23} times</div>
                        </div>
                    </div>
                </div>
                <ProfileReflections profile_id={profile.id} />
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>

<style>
    .edit-wrapper {
        width: 8rem;
    }

    .upper-data {
        margin-top: 1rem;
        background: white;
        width: 40rem;
        border-radius: 0.5rem;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
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

    .tile {
        padding: 2rem 2rem;
        font-size: 1.2rem;
        background: var(--bg-light);
        border-radius: 1rem;
        text-align: center;
        color: var(--bg-dark-grey);
    }
</style>
