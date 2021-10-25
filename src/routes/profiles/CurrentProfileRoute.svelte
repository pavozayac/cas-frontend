<script lang="ts">
    import Container from 'lib/components/Container.svelte'
    import { onMount } from 'svelte';
    import { current_profile } from 'api/Profile'
    import Card from 'lib/components/reflections/Card.svelte'

</script>

<Container>
    {#await current_profile()}
    {:then profile}
    <div class="upper-data">
        <div class="profile-info">
            {#if profile.avatar}
                <img alt="Profile picture" class="profile-icon" src={profile.avatar.saved_path} />
            {:else}
                <div style="background: red;" class="profile-icon"/>
            {/if}
            <span class="profile-name">{profile.first_name} {profile.last_name}</span>
        </div>
    </div>
    {/await}
    <Card/>
    <Card/>
    <Card/>
    <Card/>
</Container>

<style>
    .upper-data {
        background: white;
        width: 100%;
        border-radius: 0.5rem;
        padding: 3rem;
        display: flex;
        box-sizing: border-box;
    }

    .profile-name {
        margin-left: 5rem;
        font-size: 2rem;
        color: var(--bg-dark-grey);
    }

    .profile-info {
        width: 100%;
        display: flex;
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
</style>