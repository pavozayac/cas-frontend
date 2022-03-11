<script lang="ts">
import { createGroupJoinRequest } from "api/Groups";

    import { currentProfile } from "api/Profile";
    import { swr } from "api/swr";

    import Form from "lib/components/forms/Form.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
import { joinGroupSchema } from "lib/validationSchemas";
import Submit from "../forms/Submit.svelte";
import LeftCenterRightFlex from "../generic/LeftCenterRightFlex.svelte";

    let [profileStore, reloadProfile] = swr(
        currentProfile,
        "currentProfile",
        []
    );

    function onError(errors) {
        return {
            code: 'Join request has already been sent'
        }
    }
</script>

{#await $profileStore then profile}
{#if profile.group_id == null}
    <div class="wrapper">
        <a class="create-group-button" href="/create-group">
            <span class="material-icons-round create-icon">add</span>
            Create a group
        </a>
    </div>
{/if}
{/await}

<style>
    .join-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }
    
    .wrapper {
        box-sizing: border-box;
        margin-top: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    a {
        width: 100%;
        padding: 1.2rem;
        box-sizing: border-box;
        font-size: 1.1rem;
        font-family: Rubik, sans-serif;
        outline: none;
        background-color: var(--bg-grey-lower);
        border-radius: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    a:hover {
        filter: brightness(0.9);
    }

    span.create-icon {
        margin-right: 1rem;
        font-size: 1.7rem;
    }
</style>
