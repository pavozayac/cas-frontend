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
import { writable } from 'svelte/store';
import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";
import Notifications from "lib/components/notifications/Notifications.svelte"

export let group_id: string

const args = writable({
    filters: {group_id: group_id}, 
    sorts: {first_name: 'asc'},
    pagination: {
        limit: 0,
        page: 0
    }
})

let [profilesStore, reload] = swr(filterProfiles, "profiles", [$args]);
let [groupStore, reloadGroup] = swr(getGroup, "group", [group_id]);

</script>

<Nav />
<Notifications />
<SideMenu />    

{#await $groupStore then group}
{#await $profilesStore then [profiles, count]}
<CenterWrapper>
    <Container style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;">
        <CenterWrapper>
            <LeftCenterRightFlex>
                <ThinButton slot="left" fullIconName="arrow_back" text="Back to management" target={`/groups/${group_id}/manage-group`} />
                <h1 slot="center">
                    <span class="material-icons-round">group</span>
                    Members
                </h1>

            </LeftCenterRightFlex>
            {#if count > 0}
            {#each profiles as profile}
                <MemberCard id={profile.id} {reload} />
            {/each}
            {:else}
                <PlaceHolderCard heightRem={5} kindPlural="members" />
            {/if}
        </CenterWrapper>
    </Container>
</CenterWrapper>
{/await}
{/await}