<script lang="ts">
    import { filterGroups } from "api/Groups";
import { currentProfile } from "api/Profile";

    import { swr } from "api/swr";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import GroupBoxes from "lib/components/groups/GroupBoxes.svelte";
    import GroupCard from "lib/components/groups/GroupCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";

    let [groupList, reload] = swr(filterGroups, "filterGroups", [{}, {}]);
</script>

<Nav />
<SideMenu />

{#await $groupList then groups}
    <CenterWrapper>
        <Container>
            <CenterWrapper>
                <GroupBoxes />
                {#each groups as group}
                    <GroupCard group_id={group.id} />
                {/each}
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/await}

<style>
</style>
