<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import AddNotification from "./AddNotification.svelte";
    import NotificationList from "./NotificationList.svelte";
    import PostedNotifications from "./PostedNotifications.svelte";
    import Notifications from "lib/components/notifications/Notifications.svelte"

</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
    >
        <CenterWrapper>
            <AddNotification />
        </CenterWrapper>
    </Container>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box; margin-top: 1rem;"
        navMargin={false}
    >
        <CenterWrapper>
            <PostedNotifications />
        </CenterWrapper>
    </Container>
</CenterWrapper>
