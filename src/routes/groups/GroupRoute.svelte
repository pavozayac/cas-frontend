<script lang="ts">
    import { filterReflections } from "api/Reflection";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import ReflectionsList from "lib/components/generic/ReflectionsList.svelte";
    import BigGroupCard from "lib/components/groups/BigGroupCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { writable } from "svelte/store";
    import Notifications from "lib/components/notifications/Notifications.svelte"
import { pageLimit } from "lib/constants";

    export let meta;

    const args = writable({
        sorts: {
            date_added: "desc",
        },
        filters: {
            profile: {
                group_id: meta.params.id,
            },
        },
        pagination: {
            page: 0,
            limit: pageLimit
        }
    });
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <BigGroupCard group_id={meta.params.id} />
            <ReflectionsList
                fetcher={filterReflections}
                kind="groupReflections"
                {args}
            />
        </CenterWrapper>
    </Container>
</CenterWrapper>
