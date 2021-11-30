<script lang="ts">
import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import GroupBoxes from "lib/components/groups/GroupBoxes.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";


</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <GroupBoxes />
        </CenterWrapper>
    </Container>
</CenterWrapper>
<style>

</style>