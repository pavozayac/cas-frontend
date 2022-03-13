<script lang="ts">
    import { resetPassword } from "api/Auth";

    import AbsoluteCenterContainer from "lib/components/AbsoluteCenterContainer.svelte";
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Form from "lib/components/forms/Form.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import { passowrdResetSchema } from "lib/validationSchemas";
import { router } from "tinro";

    export let meta;

    const submitAction = async (values) => {
        await resetPassword(meta.params.code, values);
        router.goto('/sign-in');
    };
</script>

<AbsoluteCenterContainer>
    <!-- <Container>
            <CenterWrapper> -->
    <div class="wrapper">
        <h2>Reset password</h2>
        <Form validationSchema={passowrdResetSchema} {submitAction} let:errors onError={()=>{
            return {
                email: "Invalid reset code or email"
            }
        }}>
            <TextField
                {errors}
                name="email"
                type="text"
                placeholder="Email address"
                label="Email address"
            />
            <TextField
                {errors}
                name="password"
                type="password"
                placeholder="New password"
                label="Password"
            />
            <TextField
                {errors}
                name="repeat_password"
                type="password"
                placeholder="Repeat password"
                label="Repeat new password"
            />
            <Submit text="Reset password" />
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
