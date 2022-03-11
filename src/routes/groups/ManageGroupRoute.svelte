<script lang="ts">
    import { getGroup } from "api/Groups";
    import { swr } from "api/swr";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import GroupCard from "lib/components/groups/GroupCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { beforeUpdate } from "svelte";
    import { Route, router } from "tinro";
    import ManageOptionTile from "lib/components/groups/manage/ManageOptionTile.svelte";
    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
    import Notifications from "lib/components/notifications/Notifications.svelte"

    export let meta;
    export let profile_id;

    let [groupStore, reload] = swr(getGroup, "group", [meta.params.id]);
</script>

<Nav />
<Notifications />
<SideMenu />

{#await $groupStore then group}
        <AbsoluteCenterContainer>
            <Container style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;">
                <h1>
                    <span class="material-icons-round">table_chart</span>
                    Manage group
                </h1>
                <GroupCard grey group_id={group.id} />
                <div class="options-wrapper">
                    <ManageOptionTile
                        icon="person"
                        target={`/groups/${group.id}/members`}
                        text="Members"
                    />
                    <ManageOptionTile
                        icon="bar_chart"
                        target={`/groups/${group.id}/statistics`}
                        text="Statistics"
                    />
                    <ManageOptionTile
                        icon="create"
                        target={`/groups/${group.id}/edit`}
                        text="Edit group"
                    />
                    <ManageOptionTile
                        icon="description"
                        target={`/groups/${group.id}/join-requests`}
                        text="Join requests"
                    />
                </div>
            </Container>
        </AbsoluteCenterContainer>
{/await}

<style>
    .options-wrapper {
        width: 100%;
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>
