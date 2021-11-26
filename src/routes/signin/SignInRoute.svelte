<script lang="ts">
import AbsoluteCenterContainer from 'lib/components/AbsoluteCenterContainer.svelte';

import Container from 'lib/components/Container.svelte';

    import SignInModal from 'lib/components/sign-in/SignInModal.svelte'
    import { active } from 'tinro'
</script>

<svelte:head>
    <title>CAS Portal | Login</title>
</svelte:head>
<AbsoluteCenterContainer>
    <SignInModal />
</AbsoluteCenterContainer>