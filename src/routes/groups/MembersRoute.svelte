<script lang="ts">
import { filterProfiles } from "api/Profile";

import { swr } from "api/swr";

import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import MemberCard from "lib/components/groups/MemberCard.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";

export let group_id: string

let [profilesStore, reload] = swr(filterProfiles, "profiles", [{group_id: group_id}, {first_name: 'asc'}])
</script>

<Nav />
<SideMenu />    

{#await $profilesStore then profiles}
<CenterWrapper>
    <Container>
        <CenterWrapper>
            {#each profiles as profile}
                <MemberCard id={profile.id} />
            {/each}
        </CenterWrapper>
    </Container>
</CenterWrapper>
{/await}