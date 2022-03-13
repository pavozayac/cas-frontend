<script lang="ts">
    import { createForm } from "felte";
    import { signInFormSchema, registerSchema } from "lib/validationSchemas";
    import { validator } from "@felte/validator-yup";
    import reporter from "@felte/reporter-tippy";
    import GoogleButton from "./GoogleSignInButton.svelte";
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
            console.log("bruh");
            router.goto("/");
        },
        onError: (err) => {
            return {
                password: err,
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
        <div class="logo">
            <svg
                class="logo-svg"
                width="203.3mm"
                height="78.868mm"
                version="1.1"
                viewBox="0 0 203.3 78.868"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:cc="http://creativecommons.org/ns#"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            >
                <metadata>
                    <rdf:RDF>
                        <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type
                                rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                            />
                            <dc:title />
                        </cc:Work>
                    </rdf:RDF>
                </metadata>
                <g transform="translate(1.6524 -60.566)">
                    <path
                        d="m152.82 73.264a19.991 19.246 0 0 0-28.271 0 19.991 19.246 0 0 0-4.7e-4 27.219l33.125 31.891 28.271-27.219z"
                        fill="#00e676"
                        opacity=".8"
                    />
                    <path
                        d="m190.8 73.264a19.991 19.246 0 0 0-28.271-3e-6l-33.125 31.891 28.271 27.218 33.125-31.891a19.991 19.246 0 0 0 0-27.218z"
                        fill="#00e676"
                        opacity=".8"
                    />
                    <g fill="#1e88e5">
                        <path
                            d="m51.113 90.197a23.883 23.883 0 0 1-23.883 23.883 23.883 23.883 0 0 1-23.883-23.883 23.883 23.883 0 0 1 23.883-23.883 23.883 23.883 0 0 1 23.883 23.883z"
                            opacity=".8"
                        />
                        <g stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="m27.23 89.265a11.197 10.957 0 0 0-11.197 10.957v33.463h22.393v-33.463a11.197 10.957 0 0 0-11.197-10.957z"
                                opacity=".8"
                                stroke-width=".79816"
                            />
                            <path
                                d="m16.034 118.07h22.393v3.9736h-22.393z"
                                opacity=".8"
                                stroke-width=".70009"
                            />
                            <path
                                d="m16.034 125.52h22.393v3.9736h-22.393z"
                                opacity=".8"
                                stroke-width=".70009"
                            />
                        </g>
                    </g>
                    <path
                        d="m94.062 65.566-19.67 20.845-19.671 20.845h39.341z"
                        fill="#f50057"
                        opacity=".8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.0272"
                    />
                    <path
                        d="m75.153 134.43 19.67-20.845 19.671-20.845h-39.341z"
                        fill="#f50057"
                        opacity=".8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.0272"
                    />
                </g>
            </svg>
        </div>
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
    <a class="register-button" href="/register">Register</a>
</div>

<style>
    .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 1rem;
        transition: all 200ms;
    }

    .logo-svg {
        width: 140px;
        height: 50px;
    }

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
