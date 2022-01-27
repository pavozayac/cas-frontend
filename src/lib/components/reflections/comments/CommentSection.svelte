<script lang="ts">
import { queryComments } from "api/Comment";
import { currentProfile } from "api/Profile";
import { swr } from "api/swr";

    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";
    import AddCommentBox from "./AddCommentBox.svelte";
    import Comment from "./Comment.svelte";

    export let commentsVisible: Writable<boolean>;
    export let reflection_id: number

    let [commentsStore, reload] = swr(queryComments, 'comments', [reflection_id]);
    let [profileStore] = swr(currentProfile, 'currentProfile', []);


</script>
{#await $profileStore then profile}
{#await $commentsStore then comments}
{#if $commentsVisible}

<div class="comment-section" transition:slide|local>
    <AddCommentBox {reflection_id} {reload} />

    <div class="comments-wrapper">
        {#if comments.length > 0}
            {#each comments as comment}
                <Comment {reload} {comment} current_profile_id={profile.id} />
            {/each}
        {:else}
            <div class="no-comments">
                No comments have been posted
            </div>
        {/if}
    </div>

    <button
        class="close-button"
        on:click={() => {
            $commentsVisible = false;
        }}
    >
        <span class="material-icons-outlined">close</span> Close
    </button>
</div>
{/if}

{/await}
{/await}

<style>
    button {
        background: var(--accent-blue);
        color: white;
        width: 100%;
        height: 3rem;
        border-radius: 1rem;
        font-size: 1.125rem;
        transition: background-color color 300ms;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: Rubik, sans-serif;
        margin: 1rem;
    }

    .comment-section {
        background: var(--bg-grey);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        transition: all;
    }

    .comments-wrapper {
        width: 100%;
    }

    .close-button {
        margin: 0;
        outline: 2px solid var(--accent-blue);
        background: inherit;
        color: var(--accent-blue);
    }

    .no-comments {
        padding: 2rem;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        background: var(--bg-grey-lower);
        margin-bottom: 1rem;
        border-radius: .5rem;
    }
</style>
