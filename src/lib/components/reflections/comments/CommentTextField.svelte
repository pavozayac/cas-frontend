<script lang="ts">
    export let errors
</script>

<input
    class="add-comment-input"
    type="text"
    placeholder="Add your comment"
    name="content"
/>
    
<!-- class:error={$errosrs['content']} -->
<style>
    .add-comment-input {
        width: 100%;
        margin-right: 1rem;
        outline: none;
        border: 2px solid var(--bg-grey-lower);
        box-sizing: border-box;
        border-radius: 1rem;
        padding: 1rem;
        background: var(--bg-grey);
    }

    input {
        font-family: Rubik, sans-serif;
    }

    .error {
        border: 2px solid var(--accent-red);
    }
</style>
