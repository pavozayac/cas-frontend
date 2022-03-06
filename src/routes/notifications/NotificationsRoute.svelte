<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import AddNotification from "./AddNotification.svelte";
import NotificationList from "./NotificationList.svelte";
</script>

<Nav />
<SideMenu />

<CenterWrapper>
        <Container style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;">
            <CenterWrapper>
                <NotificationList />
            </CenterWrapper>
        </Container>
</CenterWrapper>
