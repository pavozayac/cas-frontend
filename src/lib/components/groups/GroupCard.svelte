<script lang="ts">
    import { getGroup } from "api/Groups";
    import { swr } from "api/swr";
    import { groupAvatarSrc } from "api/utils";
import InformationTile from "../generic/InformationTile.svelte";

    export let group_id: string

    let [groupStore, reload] = swr(getGroup, 'group', [group_id])

    function copyCode(){
        navigator.clipboard.writeText(group_id);
    }
</script>

{#await $groupStore then group}
<a class="card-container" href={`/groups/${group.id}`}>
    <div class="group-icon">
        <img src={groupAvatarSrc(group.avatar)} alt="Group avatar" />
    </div>
    <div class="text-container">   
        <h2>{group.name}</h2>
        <p>
            {group.description}
        </p>
    </div>
    <InformationTile style="margin-right: 1rem;" hoverable on:click={copyCode} iconName="content_paste" label="Copy code">{group_id}</InformationTile>

    <!-- <code on:click|preventDefault|stopPropagation class="code-container">
        {group_id}
    </code> -->
    <InformationTile on:click={copyCode} iconName="school" label="Graduation">{group.graduation_year}</InformationTile>

    <!-- <div class="graduation-container">
        {group.graduation_year}
    </div> -->
</a>
{/await}

<style>
    .graduation-container {
        border-radius: 9999px;
        font-family: Rubik, sans-serif;
        background: var(--bg-grey);
        padding: 2rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .code-container {
        border-radius: 9999px;
        font-family: Rubik, sans-serif;
        background: var(--bg-grey);
        padding: 0 1rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: text;
    }

    .text-container {
        width: 100%;
        height: 100%;
        margin-left: 1rem;
    }

    h2 {
        text-overflow: ellipsis;
    }

    p {
        text-overflow: ellipsis;
    }
    
    .card-container {
        background-color: white;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 0.5rem;
        overflow: hidden;
        /* margin-top: 1.25rem; */
        margin-bottom: 1rem;
        padding: 1rem;
        box-sizing: border-box;
    }

    img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 9999px;
        /* outline: 6px solid grey; */
    }


    
</style>