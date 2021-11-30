<script lang="ts">
    import Form from "lib/components/forms/Form.svelte";
    import TextField from "lib/components/forms/TextField.svelte";



</script>

<div class="wrapper">
    <a class="join-group-button">
        <span class="material-icons-round">login</span>
        Join a group
    </a>
    <a class="create-group-button" href="/create-group">
        <span class="material-icons-round">add</span>
        Create a group
    </a>
</div>

<style>
    .wrapper {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    a {
        width: 100%;
        padding: 1.2rem;
        font-size: 1.1rem;
        font-family: Rubik, sans-serif;
        outline: none;
        background-color: var(--bg-grey-lower);
        border-radius: 9999px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    a:hover {
        filter: brightness(.9);
    }

    span {
        margin-right: 1rem;
        font-size: 1.7rem;
    }
</style>