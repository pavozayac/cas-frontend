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
    import Notifications from "lib/components/notifications/Notifications.svelte";
    import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";

    export let group_id: string;

    let [requestStore, reload] = swr(getJoinRequests, "joinRequests", [
        group_id,
    ]);
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
    >
        <CenterWrapper>
            <LeftCenterRightFlex>
                <ThinButton
                    slot="left"
                    fullIconName="arrow_back"
                    text="Back to management"
                    target={`/groups/${group_id}/manage-group`}
                />
                <h1 slot="center">Group join requests</h1>
            </LeftCenterRightFlex>
            {#await $requestStore then requests}
                {#if requests.length > 0}
                    {#each requests as request}
                        <JoinRequestCard {reload} joinRequest={request} />
                    {/each}
                {:else}
                    <PlaceHolderCard heightRem={4} kindPlural="join requests" />
                {/if}
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>
