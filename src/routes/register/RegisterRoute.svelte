<script lang="ts">
    import RegisterModal from "lib/components/register/RegisterModal.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
</script>

<CenterWrapper>
    <Container navMargin={false} padding thin>
        <ThinButton target="/sign-in" text="Back to sign-in" fullIconName="arrow_back" />
        <RegisterModal />
    </Container>
</CenterWrapper>
