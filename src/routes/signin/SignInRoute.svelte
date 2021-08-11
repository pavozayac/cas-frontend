<script lang="ts">
    import SignInModal from 'lib/components/sign-in/SignInModal.svelte'
</script>

<main>
    <SignInModal />
</main>

<style>
    main {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg-grey);
    }

</style>