<script lang="ts">
    import { fade } from "svelte/transition";
    import Announcement from "./Announcement.svelte";
    import { currentNotifications } from "./announcer";
</script>

<div on:click class="wrapper">
    {#each $currentNotifications as notification}
        <Announcement text={notification} />
    {/each}
</div>

<style>
    .wrapper {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        pointer-events: none;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        z-index: 200;
    }
</style>
