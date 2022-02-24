<script lang="ts">
import { deleteComment, getComment } from "api/Comment";
import type { Comment } from 'api/Comment'

import { swr } from "api/swr";

    import { fade, scale, slide } from 'svelte/transition'

    import ProfileButton from "lib/components/generic/ProfileButton.svelte";

    // export let comment: Comment;
    export let current_profile_id: number;
    export let reload: Function;
    export let comment_id: number;
    export let reflection_id: number;

    let [commentStore] = swr(getComment, 'comment', [reflection_id, comment_id]);

    

</script>

{#await $commentStore then comment}
<!-- <div class="comment">
    <ProfileButton noName id={null} />
    <p class="comment-text">Loading</p>
</div>
{:then comment} -->
<div class="comment">
    <ProfileButton noName id={comment.profile_id} />
    <p class="comment-text">{comment.content}</p>
    {#if current_profile_id == comment.profile_id}
        <button class="delete" on:click={async () => {await deleteComment(comment.id, comment.reflection_id); await reload()}}>
            <span class="material-icons-round">delete_outline</span>
        </button>
    {/if}
</div>
{/await}

<style>
    .comment {
        background: var(--bg-grey-lower);
        padding: .5rem 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .comment :global(img) {
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        object-fit: cover;
    }

    .comment-text {
        margin-left: 2rem;
        width: 100%;
    }

    .delete {
        background: none;
        padding: 1rem 1.1rem;
        border-radius: 9999px;
        cursor: pointer;
    }

    .delete:hover {
        background: var(--bg-grey);
    }
</style>
