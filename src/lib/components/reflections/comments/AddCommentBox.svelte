<div class="add-comment">
    <form class="add-comment-form">
        <input
            class="add-comment-input"
            type="text"
            placeholder="Add your comment"
        />
        <input
            class="add-comment-button"
            type="submit"
            value="Post"
        />
    </form>
</div>

<style>
    .add-comment-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

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

    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .add-comment-button {
        font-family: Rubik, sans-serif;
        outline: none;
        border: none;
        padding: 1rem;
        background: var(--accent-blue);
        border-radius: 1rem;
        height: 100%;
        color: white;
    }
</style>