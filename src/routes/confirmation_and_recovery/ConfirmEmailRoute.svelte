<script lang="ts">
    import Container from 'lib/components/Container.svelte'
    import CenterWrapper from 'lib/components/CenterWrapper.svelte'

    import { onMount } from 'svelte';

    import { confirmEmail } from 'api/Auth'

    export let meta
</script>
<CenterWrapper>
    <Container>
        <div class="vertical-container">
            <div class="inner-container">
            {#await confirmEmail(meta.params.code) then response}
                <span class="material-icons-round">done</span>Successfully confirmed email address.
            {:catch error}
                <span class="material-icons-round">close</span>Confirmation code is invalid.
            {/await}
            </div>
        </div>
    </Container>
</CenterWrapper>

<style>
    .vertical-container {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 20rem;
        width: 30rem;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .5rem;
    }

    .inner-container {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        color: var(--bg-dark-grey);
    }

    span {
        font-size: 2rem;
        margin-right: 1rem;
        color: var(--bg-dark-grey);
    }
</style>