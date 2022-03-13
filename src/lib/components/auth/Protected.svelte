<script lang="ts">
    import { currentProfile } from "api/Profile";
    import { beforeUpdate, onMount } from "svelte";
    import { router } from "tinro";
    import { authorized } from 'stores/nav';

    export let redirect_route = "/sign-in";

    // Always include meta when these options are true
    export let admin = false;

    onMount(async () => {
        try {
            const prof = await currentProfile();

            if (admin == true) {
                if (!prof.is_admin) {
                    // console.log('not admin')
                    throw "Unauthorized access";
                }
                $authorized = true;
            } else {
                $authorized = true;
            }
        } catch (err) {
            $authorized = false;
            router.goto(redirect_route);
        }
    });
</script>

{#if $authorized}
<slot />
{/if}
