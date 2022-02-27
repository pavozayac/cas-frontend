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
import { pageLimit } from "lib/constants";
import { writable } from "svelte/store";

    const filters = writable({
        sorts: {
            name: 'asc'
        }, 
        filters: {

        },
        pagination: {
            limit: pageLimit,
            page: 0
        }
    });

    let [groupList, reload] = swr(filterGroups, "filterGroups", [$filters]);
</script>

<Nav />
<SideMenu />

{#await $groupList then [groups, count]}
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
