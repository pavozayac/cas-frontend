<script lang="ts">
    import RegisterModal from "lib/components/register/RegisterModal.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
</script>

<AbsoluteCenterContainer>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
        thin
        navMargin={false}
    >
        <ThinButton
            target="/sign-in"
            text="Back to sign-in"
            fullIconName="arrow_back"
        />
        <RegisterModal />
    </Container>
</AbsoluteCenterContainer>
