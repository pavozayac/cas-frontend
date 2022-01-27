<script lang="ts">
import { getGroup } from "api/Groups";

import { filterProfiles } from "api/Profile";
import type { BulkProfile } from 'api/Profile'

import { swr } from "api/swr";

import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import MemberCard from "lib/components/groups/MemberCard.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";
import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
import ThinButton from "lib/components/generic/ThinButton.svelte";

export let group_id: string

let [profilesStore, reload] = swr(filterProfiles, "profiles", [{group_id: group_id}, {first_name: 'asc'}]);
let [groupStore, reloadGroup] = swr(getGroup, "group", [group_id]);


function coordinatorFirst(profiles: BulkProfile[], coordinator_id){
    let coordinator = profiles.find(v => v.id == coordinator_id);
    let newArray = profiles.filter(v => v.id != coordinator_id);
    newArray.unshift(coordinator);

    return newArray;
}
</script>

<Nav />
<SideMenu />    

{#await $groupStore then group}
{#await $profilesStore then profiles}
<CenterWrapper>
    <Container>
        <CenterWrapper>
            <LeftCenterRightFlex>
                <ThinButton slot="left" fullIconName="arrow_back" text="Back to management" target={`/groups/${group_id}/manage-group`} />
                <h2 slot="center">Members</h2>

            </LeftCenterRightFlex>
            {#each coordinatorFirst(profiles, group.coordinator_id) as profile}
                <MemberCard coordinator_id={group.coordinator_id} id={profile.id} />
            {/each}
        </CenterWrapper>
    </Container>
</CenterWrapper>
{/await}
{/await}