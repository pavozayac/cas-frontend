<script lang="ts">
    import { currentProfile } from 'api/Profile';
import { route } from 'api/utils';
    import { beforeUpdate, onMount } from 'svelte';
    import { router } from 'tinro';

    export let redirect_route = '/';

    let loaded = false;

    onMount (async () => {
        const prof = await currentProfile().then(() => router.goto(redirect_route)).catch(() => loaded = true);
    });

</script>

{#if loaded}
<slot></slot>
{/if}
