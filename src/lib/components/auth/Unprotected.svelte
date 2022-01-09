<script lang="ts">
    import { currentProfile } from 'api/Profile';
import { route } from 'api/utils';
    import { beforeUpdate, onMount } from 'svelte';
    import { router } from 'tinro';

    export let redirect_route = '/';

    onMount (async () => {
        try {
            const prof = await currentProfile();
            router.goto(redirect_route)
        } finally {};
    });

</script>

<slot></slot>

