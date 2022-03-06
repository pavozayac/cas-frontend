<script lang="ts">
    import {
        deleteNotification,
        filterAuthoredNotifications,
        getNotification,
        toggleRead,
    } from "api/Notifications";

    import { swr } from "api/swr";
    import Pager from "lib/components/generic/Pager.svelte";
    import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";
    import PostedNotification from "lib/components/notifications/PostedNotification.svelte";
    import { pageLimit } from "lib/constants";
    import { writable } from "svelte/store";
    import Select from "lib/components/generic/Select.svelte";
    import { sortChange } from "api/utils";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";

    const args = writable({
        sorts: {
            date_sent: "desc",
        },
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });
    const pageStore = writable(0);

    const [notificationsStore, reload] = swr(
        filterAuthoredNotifications,
        "notifications",
        [$args]
    );
</script>

<h1>
    <span class="material-icons-round">edit_notifications</span>
    Posted notifications
</h1>

<LeftCenterRightFlex>
    <Select
        slot="right"
        box={false}
        change={(value) => sortChange(value, args, pageStore, reload)}
        label="Sort by"
        options={[
            {
                value: {
                    date_sent: "desc",
                },
                text: "Most recent",
            },
            {
                value: {
                    date_sent: "asc",
                },
                text: "Least recent",
            },
        ]}
    />
</LeftCenterRightFlex>

{#await $notificationsStore then [notifications, count, readCount]}
    <div class="notifications-container">
        {#if count > 0}
            {#each notifications as note, index}
                <PostedNotification {note} {reload} />
            {/each}
        {:else}
            <PlaceHolderCard heightRem={7} kindPlural="notifications" />
        {/if}
    </div>
    <Pager {args} {pageStore} {count} {reload} />
{/await}

<style>
    .notifications-container {
        width: 100%;
    }
</style>
