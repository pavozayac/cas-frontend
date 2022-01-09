<script lang="ts">
import { getJoinRequests } from "api/Groups";
import { swr } from "api/swr";

    export let group_id: string;

    let [requestStore, reload] = swr(getJoinRequests, 'joinRequests', [group_id]);
</script>

{#await $requestStore then requests}
    {#each requests as request}
        <
    {/each}
{/await}