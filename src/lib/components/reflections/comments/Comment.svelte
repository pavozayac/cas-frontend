<script>
    import ProfileButton from "lib/components/generic/ProfileButton.svelte";

    export let comment;
</script>

<div class="comment">
    <ProfileButton noName id={5} />
    <p class="comment-text">{comment.text}</p>
</div>

<style>
    .comment {
        background: var(--bg-grey-lower);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .comment :global(img) {
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        object-fit: cover;
    }

    .comment-text {
        margin-left: 2rem;
    }
</style>
