<script lang="ts">
    import { createForm } from 'felte'
    import { signInFormSchema } from 'lib/validationSchemas'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'
    import GoogleButton from './GoogleSignInButton.svelte'
    import FacebookButton from './FacebookSignInButton.svelte'

    import { login } from 'api/Auth'
    import { route } from 'api/utils'
    import axios from 'axios';

    import { router } from 'tinro'

    const { form, errors } = createForm({
        onSubmit: async (values) => {
            console.log(values)
            console.log(await login(values.email, values.password))
            router.goto('/')
        },
        extend: [validator, reporter({
            tippyProps: {
                trigger: 'submit'
            }
        })],
        validateSchema: signInFormSchema,
    })
</script>

{@debug $errors}

<div class="modal-wrapper">
    <div class="title">
        <h3>Sign in to CAS Portal</h3>
    </div>
    <form use:form>
        <input class:error="{$errors.email}" class="email" type="email" name="email" placeholder="Email address"/>
        <input class:error="{$errors.password}" class="password" type="password" name="password" placeholder="Password" />
        <input class="sign-in-button" type="submit" value="Sign in" />
    </form>

    <div class="social-wrapper">
        <GoogleButton/>
        <FacebookButton/>
    </div>
</div>

<style>


    .modal-wrapper {
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
        font-size: .9rem;
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

    .email, .password {
        box-sizing: border-box;
        border-radius: 9999px;
        width: 100%;
        outline: none;
        border: none;
        background: var(--bg-grey);
        padding: 1rem 2rem;
    }

    .email:focus, .password:focus {
        filter: brightness(.9);
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
        font-size: .9rem;
        font-family: Rubik, sans-serif;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    button:hover {
        filter: brightness(.9);
    }
</style>