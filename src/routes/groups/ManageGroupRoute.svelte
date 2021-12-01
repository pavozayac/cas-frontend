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

export let meta
export let profile_id

let [groupStore, reload] = swr(getGroup, 'group', [meta.params.id]);

beforeUpdate(async () => {
    let group = await $groupStore;
    if (group.coordinator_id != profile_id){
        router.goto("/")
    }
})

</script>

<Nav />
<SideMenu />

{#await $groupStore then group}
{#if group.coordinator_id == profile_id}
    <CenterWrapper>
        <Container>
            <CenterWrapper>
                <GroupCard group_id={group.id}/>
                <div class="options-wrapper">
                    <ManageOptionTile icon="person" target={`/groups/${group.id}/members`} text="Members" />
                    <ManageOptionTile icon="bar_chart" target={`/groups/${group.id}/members`} text="Statistics" />
                    <ManageOptionTile icon="create" target={`/groups/${group.id}/edit`} text="Edit group" />
                    <ManageOptionTile icon="description" target={`/groups/${group.id}/join-requests`} text="Join requests" />
                </div>
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/if}
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