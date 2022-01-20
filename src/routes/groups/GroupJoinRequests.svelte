<script lang="ts">
    import { getJoinRequests } from "api/Groups";
    import { swr } from "api/swr";
    import JoinRequestCard from "lib/components/groups/JoinRequestCard.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";
import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
import ThinButton from "lib/components/generic/ThinButton.svelte";

    export let group_id: string;

    let [requestStore, reload] = swr(getJoinRequests, "joinRequests", [
        group_id,
    ]);
</script>

<Nav/>
<SideMenu/>

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <LeftCenterRightFlex>
                <ThinButton slot="left" fullIconName="arrow_back" text="Back to management" target={`/groups/${group_id}/manage-group`} />
                <h2 slot="center">Group join requests</h2>

            </LeftCenterRightFlex>
            {#await $requestStore then requests}
                {#each requests as request}
                    <JoinRequestCard {reload} joinRequest={request} />
                {/each}
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>
