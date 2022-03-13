<script lang="ts">
    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import CreateGroupForm from "lib/components/groups/CreateGroupForm.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import Notifications from "lib/components/notifications/Notifications.svelte";
</script>

<Nav />
<Notifications />
<SideMenu />

<AbsoluteCenterContainer>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
    >
        <div class="wrapper">
            <h1>
                <span class="material-icons-round" />
                Create a group
            </h1>
            <CreateGroupForm />
        </div>
    </Container>
</AbsoluteCenterContainer>

<style>
    .wrapper {
        width: 100%;
        background: white;
        border-radius: 0.5rem;
        box-sizing: border-box;
    }

    h2 {
        text-align: center;
    }
</style>
