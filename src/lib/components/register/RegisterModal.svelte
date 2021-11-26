<script lang="ts">
    import { createForm } from "felte";
    import { signInFormSchema, registerSchema } from "lib/validationSchemas";
    import { validator } from "@felte/validator-yup";
    import reporter from "@felte/reporter-tippy";
    import Form from "lib/components/forms/Form.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import Group from "lib/components/transitions/Group.svelte";
    import Phase from "lib/components/transitions/Phase.svelte";
    import AbsoluteCenterContainer from "../AbsoluteCenterContainer.svelte";

    import { login, register } from "api/Auth";

    import { router } from "tinro";
    import RadioGroup from "../forms/RadioGroup.svelte";
    import CenterWrapper from "../CenterWrapper.svelte";
    import ThinButton from "../generic/ThinButton.svelte";
    import SubtleButton from "../generic/SubtleButton.svelte";

    const register_redirect = async (values) => {
        console.log(values.email);
        const res = await register(values);
        router.goto("/sign-in");
    };

    const onError = (errors) => {
        errors.password = "Invalid credentials";
    };

</script>

<Form
    let:errors
    let:handleSubmit
    validationSchema={registerSchema}
    submitAction={register_redirect}
    {onError}
>
    <TextField {errors} name="email" type="email" />
    <TextField {errors} name="first_name" type="text" />
    <TextField {errors} name="last_name" type="text" />
    <br />
    <TextField {errors} name="password" type="password" />
    <TextField {errors} name="repeat_password" type="password" />
    <RadioGroup
        initialValue={0}
        text="Post visibility"
        name="post_visibility"
        items={{
            "Only you can see your posts": 0,
            "Only your group can see your posts": 1,
            "Anybody can see your posts": 2,
        }}
    />
    <br />
    <Submit text="Register" />
</Form>


<style>
    .register-button {
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        margin-top: 2rem;
        width: 60%;
        color: var(--accent-blue);
        background: white;
        border-radius: 9999px;
        outline: var(--accent-blue) 2px solid;
        padding: 1rem 2rem;
    }

    .modal-wrapper {
        /* margin: auto; */
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

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    .social-wrapper {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
    }

    .social-wrapper > button {
        width: 100%;
        margin-top: 1rem;
        padding: 1rem 2rem;
        border-radius: 9999px;
        background: var(--accent-green);
        color: white;
        font-size: 0.9rem;
        font-family: Rubik, sans-serif;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .error {
        box-shadow: 0 0 0 2px var(--accent-red);
    }

    input {
        width: 80%;
        margin-top: 1rem;
    }

    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .email,
    .password {
        box-sizing: border-box;
        border-radius: 9999px;
        width: 100%;
        outline: none;
        border: none;
        background: var(--bg-grey);
        padding: 1rem 2rem;
    }

    .email:focus,
    .password:focus {
        filter: brightness(0.9);
    }

    .sign-in-button {
        width: 100%;
        background: var(--accent-blue);
        border-radius: 9999px;
        color: white;
        outline: none;
        border: none;
        cursor: pointer;
        padding: 1rem 2rem;
        font-size: 0.9rem;
        font-family: Rubik, sans-serif;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    button:hover {
        filter: brightness(0.9);
    }
</style>
