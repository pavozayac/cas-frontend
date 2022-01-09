<script lang="ts">
    import { currentProfile } from 'api/Profile';
    import { beforeUpdate, onMount } from 'svelte';
    import { router } from 'tinro';

    export let redirect_route = '/sign-in';

    onMount (async () => {
        try {
            const prof = await currentProfile();
        } catch (err) {
            router.goto(redirect_route);
        };
    });

</script>

<slot></slot>

