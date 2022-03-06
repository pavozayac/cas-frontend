<script lang="ts">
    import { transformDate } from "api/utils";
    import { announce } from "lib/components/announcer/announcer";
    import {
        deleteNotification,
        getNotification,
        toggleRead,
    } from "api/Notifications";
    import type { BulkNotification } from "api/Notifications";
    import RecipientProfileButton from "./RecipientProfileButton.svelte";
import PlaceHolderCard from "../generic/PlaceHolderCard.svelte";

    export let note: BulkNotification;
    export let reload: Function;

    let recipientsShown = false;
</script>

{#await getNotification(note.id, true)}
    <PlaceHolderCard loading heightRem={5.5}/>
{:then notification}
    <div class="notification">
        <div class="up">
            <div class="left">
                <div class="date">
                    {transformDate(notification.date_sent)}
                </div>
                <div class="text">
                    {notification.content}
                </div>
            </div>
            <div class="right">
                <button
                    on:click={() => {
                        recipientsShown = !recipientsShown;
                    }}
                    title={recipientsShown ? "Hide recipients" : "Show recipients"}
                    class="notification-action"
                >
                    <span class="material-icons-round">group</span>
                </button>
                <button
                    on:click={async () => {
                        try {
                            await deleteNotification(note.id);
                            reload();
                            announce("Deleted notification");
                        } catch (err) {
                            announce("Error: Failed to delete notification");
                        }
                        reload();
                    }}
                    title="Delete notification"
                    class="notification-action"
                >
                    <span class="material-icons-round">delete</span>
                </button>
            </div>
        </div>

        {#if recipientsShown}
            <div class="down">
                {#each notification.notification_recipients as recipient}
                    <RecipientProfileButton id={recipient.profile_id} />
                {/each}
            </div>
        {/if}
    </div>
{/await}

<style>
    .notification-action {
        width: 3.5rem;
        height: 3.5rem;
        padding: 1rem;
        box-sizing: border-box;
        background: transparent;
        cursor: pointer;
        border-radius: 9999px;
    }

    .notification-action:hover {
        background: var(--bg-grey-lower);
    }

    .notification-action span {
        font-size: 1.5rem;
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
    }

    .up {
        display: flex;
        justify-content: space-between;
    }
</style>
