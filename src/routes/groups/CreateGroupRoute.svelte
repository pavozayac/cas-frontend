<script lang="ts">
    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
import CreateGroupForm from "lib/components/groups/CreateGroupForm.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";
</script>

<Nav />
<SideMenu />


<AbsoluteCenterContainer>
    <Container>
        <div class="wrapper">
            <h2>Create a group</h2>
            <CreateGroupForm />
        </div>
    </Container>
</AbsoluteCenterContainer>

<style>
    .wrapper {
        width: 100%;
        background: white;
        padding: 3rem;
        border-radius: .5rem;
        box-sizing: border-box;
    }

    h2 {
        text-align: center;
    }
</style>