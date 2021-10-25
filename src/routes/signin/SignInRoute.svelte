<script lang="ts">
    import SignInModal from 'lib/components/sign-in/SignInModal.svelte'
</script>

<svelte:head>
    <title>CAS Portal | Login</title>
</svelte:head>

<main>
    <div class="back-wrapper">    
        <a class="back-button" href="/">
            <span class="material-icons-round">arrow_back</span>
            Back to home screen
        </a>
    </div>
    <SignInModal />
</main>

<style>
    main {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--bg-grey);
    }

    .back-wrapper {
        width: 20rem;
        display: flex;
        justify-content: flex-start;
    }

    .back-button {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        font-family: Rubik, sans-serif; 
        background: transparent; 
        margin-bottom: 1rem;
        border-radius: 9999px;
        cursor: pointer;
    }   

    .back-button:hover {
        background: var(--bg-grey-lower);
    }

    .back-button > span {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }
</style>