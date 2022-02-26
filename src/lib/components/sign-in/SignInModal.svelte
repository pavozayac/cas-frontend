<script lang="ts">
    import { createForm } from "felte";
    import { signInFormSchema, registerSchema } from "lib/validationSchemas";
    import { validator } from "@felte/validator-yup";
    import reporter from "@felte/reporter-tippy";
    import GoogleButton from "./GoogleSignInButton.svelte";
    import FacebookButton from "./FacebookSignInButton.svelte";
    import Form from "lib/components/forms/Form.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import Group from "lib/components/transitions/Group.svelte";
    import Phase from "lib/components/transitions/Phase.svelte";
    import AbsoluteCenterContainer from "../AbsoluteCenterContainer.svelte";

    import { login, register } from "api/Auth";
    import { route } from "api/utils";
    import axios from "axios";

    import { router, active, Route } from "tinro";
    import RadioGroup from "../forms/RadioGroup.svelte";
    import CenterWrapper from "../CenterWrapper.svelte";
    import ThinButton from "../generic/ThinButton.svelte";
    import SubtleButton from "../generic/SubtleButton.svelte";

    const { form, errors } = createForm({
        onSubmit: async (values) => {
            const jwt = await login(values.email, values.password);
            console.log('bruh');
            router.goto("/", true);
        },
        onError: (err) => {
            return {
                password: "Invalid credentials",
            };
        },
        extend: [
            validator,
            reporter({
                tippyProps: {
                    trigger: "submit",
                },
            }),
        ],
        validateSchema: signInFormSchema,
    });
</script>

<!-- {@debug $errors} -->
<div class="modal-wrapper">
    <div class="title">
        <h2>Sign in to CAS Portal</h2>
    </div>
    <form use:form>
        <input
            class:error={$errors.email}
            class="email"
            type="email"
            name="email"
            placeholder="Email address"
        />
        <input
            class:error={$errors.password}
            class="password"
            type="password"
            name="password"
            placeholder="Password"
        />
        <input class="sign-in-button" type="submit" value="Sign in" />
    </form>
    <SubtleButton
        style="color: var(--bg-dark-grey); margin-top: 1rem;"
        target="/forgot-my-password"
        fullIconName="question_mark"
        text="Forgot my password"
    />
    <div class="social-wrapper">
        <GoogleButton />
        <!-- <FacebookButton /> -->
    </div>
    <a class="register-button" use:active href="/register">Register</a>
</div>

<style>
    h2 {
        font-family: Rubik, sans-serif;
        font-weight: 600;
    }

    .register-button {
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        margin-top: 1rem;
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
        font-family: Rubik, sans-serif;
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
