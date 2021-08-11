<script lang="ts">
    import { createForm } from 'felte'

    const { form } = createForm({
        onSubmit: values => {
            console.log(JSON.stringify(values))
        }
    })
</script>

<div class="modal-wrapper">
    <div class="form-wrapper">
        <form use:form>
            <div class="text-input-group">
                <label for="email">Email address</label>
                <input class="email" type="email" name="email" />
            </div>
            <div class="text-input-group">
                <label for="password">Password</label>
                <input class="password" type="password" name="password" />
            </div>
            <input class="sign-in-button" type="submit" value="Sign in" />
        </form>
    </div>
</div>

<style>
    .modal-wrapper {
        width: 40%;
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text-input-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-top: 1rem;
    }

    .text-input-group > label {
        padding: 0.5rem;
        font-size: .9rem;
    }

    .email, .password {
        height: 2rem;
        border-radius: 0.5rem;
        outline: none;
        border: none;
        background: var(--bg-grey);
        padding: 0.2rem 0.5rem;
    }

    .email:focus, .password:focus {
        filter: brightness(.9);
    }
    

    .sign-in-button {
        margin-top: 2rem;
        width: 100%;
        background: var(--accent-blue);
        border-radius: 9999px;
        height: 2rem;
        color: white;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .sign-in-button:hover {
        filter: brightness(.9);
    }
</style>