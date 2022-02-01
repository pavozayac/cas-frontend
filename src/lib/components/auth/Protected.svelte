<script lang="ts">
    import { getGroup } from "api/Groups";

    import { currentProfile } from "api/Profile";
    import { beforeUpdate, onMount } from "svelte";
    import { router } from "tinro";
    import { authorized } from 'stores/nav';

    export let redirect_route = "/sign-in";

    // Always include meta when these options are true
    export let coordinator = false;
    export let meta = null;

    onMount(async () => {
        try {
            const prof = await currentProfile();

            $authorized = true;

            if (coordinator == true && meta.params.id) {
                const group = await getGroup(meta.params.id);

                if (prof.id != group.coordinator_id) {
                    throw "Unauthorized access";
                }
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
