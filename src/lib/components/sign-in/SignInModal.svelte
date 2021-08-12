<script lang="ts">
    import { createForm } from 'felte'
    import { signInFormSchema } from 'lib/validationSchemas'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'

    const { form, errors } = createForm({
        onSubmit: (values) => {
            console.log(JSON.stringify(errors));
        },
        extend: [validator, reporter()],
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
        <button>Google</button>
        <button>Facebook</button>
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
        outline: 2px solid var(--accent-red) !important;
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