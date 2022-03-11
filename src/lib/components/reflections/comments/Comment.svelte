<script lang="ts">
    import { deleteComment, getComment } from "api/Comment";
    import type { Comment } from "api/Comment";

    import { swr } from "api/swr";

    import { fade, scale, slide } from "svelte/transition";

    import ProfileButton from "lib/components/generic/ProfileButton.svelte";
    import { currentProfile } from "api/Profile";
    import ConfirmModal from "lib/components/generic/ConfirmModal.svelte";
    import { announce } from "lib/components/announcer/announcer";

    // export let comment: Comment;
    // export let current_profile_id: number;
    export let reload: Function;
    export let comment_id: number;
    export let reflection_id: number;

    let [commentStore] = swr(getComment, "comment", [
        reflection_id,
        comment_id,
    ]);
    let [currentProfileStore] = swr(currentProfile, "current", []);
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
        {#await $currentProfileStore then profile}
            {#if profile.id == comment.profile_id || profile.is_admin}
                <ConfirmModal
                    confirmText="Delete"
                    denyText="Cancel"
                    text="Do you want to delete this comment?"
                    let:show
                >
                    <button
                        class="delete"
                        on:click={() =>
                            show(async () => {
                                try {
                                    await deleteComment(
                                        comment.id,
                                        comment.reflection_id
                                    );
                                    announce('Successfully deleted comment.')
                                    await reload();
                                } catch (err) {
                                    announce('Error: could not delete comment.')
                                }
                            })}
                    >
                        <span class="material-icons-round">delete_outline</span>
                    </button>
                </ConfirmModal>
            {/if}
        {/await}
    </div>
{/await}

<style>
    .comment {
        background: var(--bg-grey-lower);
        padding: 0.5rem 1rem;
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
