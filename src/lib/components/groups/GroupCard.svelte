<script lang="ts">
    import { getGroup } from "api/Groups";
    import { swr } from "api/swr";
    import { groupAvatarSrc } from "api/utils";

    export let group_id: string

    let [groupStore, reload] = swr(getGroup, 'group', [group_id])
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
    <div class="graduation-container">
        {group.graduation_year}
    </div>
</a>
{/await}

<style>
    .graduation-container {
        border-radius: 9999px;
        font-family: Rubik, sans-serif;
        background: var(--bg-grey);
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
        /* margin-bottom: 1.25rem; */
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