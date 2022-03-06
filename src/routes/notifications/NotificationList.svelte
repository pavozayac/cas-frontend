<script lang="ts">
    import {
        filterNotifications,
        getNotification,
        toggleRead,
    } from "api/Notifications";

    import { swr } from "api/swr";
    import { sortChange, transformDate } from "api/utils";
    import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";
    import Pager from "lib/components/generic/Pager.svelte";
    import { pageLimit } from "lib/constants";
    import { writable } from "svelte/store";
    import Select from "lib/components/generic/Select.svelte";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";

    const args = writable({
        sorts: {
            read_omit: "asc",
        },
        filters: {},
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });
    const pageStore = writable(0);

    const [notificationsStore, reload] = swr(
        filterNotifications,
        "notifications",
        [$args]
    );
</script>

<h1>
    <span class="material-icons-round">notifications</span>
    Received notifications
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
                    read_omit: "asc",
                },
                text: "Unread first",
            },
            {
                value: {
                    read_omit: "desc",
                },
                text: "Read first",
            },
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

<div class="notifications-container">
    {#await $notificationsStore then [notifications, count, readCount]}
        {#if count > 0}
            {#each notifications as note, index}
                {#await getNotification(note.id)}
                    <PlaceHolderCard loading heightRem={5.5} />
                {:then notification}
                    <div class="notification">
                        <div class="left">
                            <div class="date">
                                {transformDate(notification.date_sent)}
                                {#if notification.read}
                                    <span class="read">Read</span>
                                {:else}
                                    <span class="unread">Not read</span>
                                {/if}
                            </div>
                            <div class="text">
                                {notification.content}
                            </div>
                        </div>
                        <div class="right">
                            {#if notification.read}
                                <button
                                    on:click={() => {
                                        toggleRead(note.id);
                                        reload([$args]);
                                    }}
                                    title="Mark as unread"
                                    class="toggle-read"
                                >
                                    <span class="material-icons-round"
                                        >drafts</span
                                    >
                                </button>
                            {:else}
                                <button
                                    on:click={() => {
                                        toggleRead(note.id);
                                        reload([$args]);
                                    }}
                                    title="Mark as read"
                                    class="toggle-read"
                                >
                                    <span class="material-icons-round"
                                        >mark_email_read</span
                                    >
                                </button>
                            {/if}
                        </div>
                    </div>
                {/await}
            {/each}
        {:else}
            <PlaceHolderCard kindPlural="notifications" heightRem={7} />
        {/if}
        <Pager {args} {pageStore} {count} {reload} />
    {/await}
</div>

<style>
    h1 {
        text-align: center;
    }

    .toggle-read {
        width: 3.5rem;
        height: 3.5rem;
        padding: 1rem;
        box-sizing: border-box;
        background: transparent;
        cursor: pointer;
        border-radius: 9999px;
    }

    .toggle-read:hover {
        background: var(--bg-grey-lower);
    }

    .toggle-read span {
        font-size: 1.5rem;
    }

    .notifications-container {
        width: 100%;
    }

    .date {
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .notification {
        font-family: Rubik, sans-serif;
        background: var(--bg-grey);
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 0.5rem;
        display: flex;
        justify-content: space-between;
    }

    .read,
    .unread {
        font-weight: normal;
    }

    .read {
        color: var(--accent-green);
    }

    .unread {
        color: var(--accent-red);
    }
</style>
