<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
import ThinButton from "lib/components/generic/ThinButton.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
import { router } from "tinro";

    import EditGroupForm from "../../lib/components/groups/EditGroupForm.svelte";

    export let meta;

</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <div class="wrapper">
                <LeftCenterRightFlex>
                    <ThinButton
                        slot="left"
                        target={`/groups/${meta.params.id}`}
                        fullIconName="arrow_back"
                        text="Back to group"
                    />
                    <h2 slot="center">Edit group</h2>
                </LeftCenterRightFlex>
                <EditGroupForm group_id={meta.params.id} />
            </div>
        </CenterWrapper>
    </Container>
</CenterWrapper>

<style>
    .wrapper {
        width: 100%;
        background: white;
        padding: 1rem 3rem;
        border-radius: 0.5rem;
        box-sizing: border-box;
    }

    h2 {
        text-align: center;
        /* vertical-align: middle */
    }
</style>
