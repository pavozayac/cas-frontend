<script lang="ts">
    import { sendRecoveryRequest } from "api/Auth";

    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Form from "lib/components/forms/Form.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import { passwordRecoverySchema } from "lib/validationSchemas";
    import { router } from "tinro";

    const submitAction = async (values) => {
        await sendRecoveryRequest(values.email);
        router.goto("/sign-in");
    };
</script>

<AbsoluteCenterContainer>
    <!-- <Container>
        <CenterWrapper> -->
    <ThinButton
        target="/sign-in"
        text="Back to sign-in"
        fullIconName="arrow_back"
    />
    <div class="wrapper">
        <h2>Forgot my password</h2>
        <Form
            validationSchema={passwordRecoverySchema}
            {submitAction}
            let:errors
        >
            <TextField
                {errors}
                name="email"
                type="text"
                placeholder="Email address"
                label="Recovery email address"
            />
            <Submit text="Recover password" />
        </Form>
    </div>
    <!-- </CenterWrapper>
    </Container> -->
</AbsoluteCenterContainer>

<style>
    .wrapper {
        width: 20rem;
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: Rubik, sans-serif;
    }
</style>
