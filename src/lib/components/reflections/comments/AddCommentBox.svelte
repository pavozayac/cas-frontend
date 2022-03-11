<script lang="ts">
import { postComment } from "api/Comment";

import Form from "lib/components/forms/Form.svelte";
import { commentSchema } from "lib/validationSchemas";
import CommentTextField from "./CommentTextField.svelte";
import { announce } from "lib/components/announcer/announcer";

export let reflection_id: number
export let reload: Function


</script>

<div class="add-comment">
    <Form let:errors validationSchema={commentSchema} submitAction={async (values) => {
        try {
            await postComment(values, reflection_id);
            announce('Successfully posted comment.')
            reload();
        } catch (err) {
            announce('Error: could not post comment.')
        }
    }}>
        <CommentTextField {errors} />
        <input
            class="add-comment-button"
            type="submit"
            value="Post"
        />
    </Form>
</div>

<style>
    .add-comment {
        width: 100%;
    }
    
    .add-comment :global(form) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
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