<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import AddNotification from "./AddNotification.svelte";
    import NotificationList from "./NotificationList.svelte";
    import Notifications from "lib/components/notifications/Notifications.svelte";
    import { filterNotifications } from "api/Notifications";
    import { swr } from "api/swr";
    import { pageLimit } from "lib/constants";
    import { writable } from "svelte/store";

    const args = writable({
        sorts: {},
        filters: {
            read: false,
        },
        pagination: {
            limit: 4,
            page: 0,
        },
    });

    const [nStore, r] = swr(filterNotifications, "notifications", [$args]);
</script>

<Nav />
<Notifications notificationsSWR={[nStore, r]} />
<SideMenu />

<CenterWrapper>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
    >
        <CenterWrapper>
            <NotificationList reloadRecent={r} />
        </CenterWrapper>
    </Container>
</CenterWrapper>
