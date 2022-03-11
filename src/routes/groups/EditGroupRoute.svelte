<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { router } from "tinro";
    import Notifications from "lib/components/notifications/Notifications.svelte";

    import EditGroupForm from "../../lib/components/groups/EditGroupForm.svelte";
import ConfirmModal from "lib/components/generic/ConfirmModal.svelte";
import { deleteGroup } from "api/Groups";
import { announce } from "lib/components/announcer/announcer";

    export let meta;
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <div class="wrapper">
                <LeftCenterRightFlex>
                    <ThinButton
                        slot="left"
                        target={`/groups/${meta.params.id}/manage-group`}
                        fullIconName="arrow_back"
                        text="Back to group management"
                    />
                    <h2 slot="center">Edit group</h2>
                    <div slot="right">
                        <ConfirmModal
                            let:show
                            text="Are you sure you want to delete this group?"
                            confirmText="Delete"
                            denyText="Cancel"
                        >
                            <ThinButton
                                action={() => {
                                    show(() => {
                                        try {
                                            deleteGroup(meta.params.id);
                                            router.goto("/groups");
                                            announce('Successfully deleted group.');
                                        } catch (err) {
                                            announce('Error: could not delete group.'); 
                                        }
                                    });
                                }}
                                style="float: right;"
                                text="Delete group"
                                fullIconName="delete"
                            />
                        </ConfirmModal>
                    </div>
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
