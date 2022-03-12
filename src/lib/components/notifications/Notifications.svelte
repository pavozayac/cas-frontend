<script lang="ts">
    import {
        filterNotifications,
        getNotification,
        toggleRead,
    } from "api/Notifications";
    import type { BulkNotification } from "api/Notifications";

    import { swr } from "api/swr";
    import { transformDate } from "api/utils";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store"; 
    import PlaceHolderCard from "../generic/PlaceHolderCard.svelte";

    export let notificationsSWR: [Writable<Promise<[BulkNotification[], number, number]>>, Function] | [] = [];

    const args = writable({
        sorts: {},
        filters: {
            read: false,
        },
        pagination: {
            limit: 4,
            page: 0,
        },
    });

    let notificationsStore;
    let reload;

    if (notificationsSWR.length == 0) {
        const [nStore, r] = swr(
            filterNotifications,
            "notifications",
            [$args]
        );

        notificationsStore = nStore;
        reload = r;
    } else {
        notificationsStore = notificationsSWR[0];
        reload = notificationsSWR[1];
    }

    

</script>

{#await $notificationsStore then [notifications, count, read_count]}
    <div class="notifications-container">
        <h1 style="font-size: 1.5rem;">
            <span class="material-icons-round">notifications</span>
            Recent notifications
        </h1>

        <div class="gapflex">
            {#if count > 0}
                {#each notifications as note, index}
                    {#await getNotification(note.id) then notification}
                        <div class="notification">
                            <div
                                on:click={() => {
                                    toggleRead(note.id);
                                    reload([$args]);
                                }}
                                class="dismiss"
                            >
                                Click to dismiss
                            </div>
                            <div class="text">
                                <span class="date"
                                    >{String(
                                        transformDate(notification.date_sent)
                                            .split(" ")
                                            .slice(0, 2)
                                    ).replaceAll(",", " ")}</span
                                >
                                {notification.content}
                            </div>
                        </div>
                    {/await}
                {/each}
            {:else}
                <PlaceHolderCard kindPlural="new notifications" heightRem={4} />
            {/if}
        </div>
    </div>
{/await}

<style>
    .gapflex {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.5rem;
    }

    .date {
        font-weight: bold;
    }

    .notifications-container {
        background: white;
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 22rem);
        position: fixed;
        padding: 1rem;
        border-radius: 1rem;
        font-family: Rubik, sans-serif;
        overflow: hidden;
        user-select: none;
        width: 20rem;
    }

    .text {
        padding: 1rem;
    }

    .notification {
        background: var(--bg-grey);
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
    }

    .notification::before {
        content: "";
        position: absolute;
        width: 90%;
        margin-left: 5%;
        height: 100%;
    }

    .dismiss {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        opacity: 0;
        color: white;
        cursor: pointer;
    }

    .dismiss:hover {
        opacity: 0.7;
        background: black;
    }
</style>
