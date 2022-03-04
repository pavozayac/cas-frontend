<script lang="ts">
    import { createForm } from "felte";
    import { validator } from "@felte/validator-yup";
    import reporter from "@felte/reporter-tippy";
    import { notificationSchema } from "lib/validationSchemas";
    import TextField from "lib/components/forms/TextField.svelte";
    import { swr } from "api/swr";
    import { filterProfiles } from "api/Profile";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import RecipientProfileButton from "lib/components/notifications/RecipientProfileButton.svelte";
    import { filterGroups } from "api/Groups";
    import RecipientGroupButton from "lib/components/notifications/RecipientGroupButton.svelte";
    import { postNotification } from "api/Notifications";

    const { form, errors, setField, data } = createForm({
        onSubmit: async (values) => {
            try {
                await postNotification(values);
            } catch(err) {
                console.log(err)
            }
        },
        onError: (err) => {
            // return {
            //     password: "Invalid credentials",
            // };
        },
        extend: [
            validator,
            reporter({
                tippyProps: {
                    trigger: "submit",
                },
            }),
        ],
        validateSchema: notificationSchema,
    });

    const profileArgs = writable({
        sorts: {
            first_name: "asc",
        },
        filters: {},
        pagination: {
            limit: 0,
            page: 0,
        },
    });

    const groupArgs = writable({
        sorts: {
            name: "asc",
        },
        filters: {},
        pagination: {
            limit: 0,
            page: 0,
        },
    });

    const [profileStore, reloadProfiles] = swr(
        filterProfiles,
        "addNotificationProfiles",
        [$profileArgs]
    );
    const [groupStore, reloadGroups] = swr(
        filterGroups,
        "addNotificationGroups",
        [$groupArgs]
    );

    function onSearchChange(e) {
        if (searchValue.length > 1) {
            $groupArgs = {
                ...$groupArgs,
                filters: {
                    full_text_con: searchValue,
                },
            };
            reloadGroups([$groupArgs]);

            $profileArgs = {
                ...$profileArgs,
                filters: {
                    full_text_con: searchValue,
                },
            };
            reloadProfiles([$profileArgs]);
        }
    }

    let searchValue: string = "";

    interface RecipientObject {
        type: 'group' | 'profile';
        id: string | number;
    }

    let added: Writable<Set<string>> = writable(new Set());

    added.subscribe(value => {
        let ids: Set<number> = new Set();
        [...value.values()].map(v => JSON.parse(v)).forEach(recObj => {
            if (recObj.type == 'profile'){
                ids.add(recObj.id);
            } else {
                filterProfiles({
                    sorts: {},
                    filters: {
                        group_id: recObj.id
                    },
                    pagination: {
                        limit: 0,
                        page: 0
                    }
                }).then(([profiles, count]) => {
                    profiles.forEach(profile => ids.add(profile.id))
                })
            }
        })

        setField('recipients', [...ids.values()]);
        console.log($data)
    })
</script>

<form use:form>
    <div class="post-wrapper">
        <TextField
            type="text"
            {errors}
            noMargin
            name="content"
            label="Notification content"
            placeholder="Content"
        />
        <button class="post">
            <span class="material-icons-round">edit</span>Post
        </button>
    </div>
    
    {#if $added.size > 0}
        <h2>Added recipients</h2>
        {#each [...$added.values()].map(v => JSON.parse(v)) as recipient}
            {#if recipient.type == "profile"}
                <RecipientProfileButton action={() => {
                    let theSet = $added;
                    theSet.delete(JSON.stringify({
                        type: "profile",
                        id: recipient.id,
                    }));

                    $added = theSet;
                }} id={recipient.id} icon="close" />
            {:else}
                <RecipientGroupButton action={() => {
                    let theSet = $added;
                    theSet.delete(JSON.stringify({
                        type: "group",
                        id: recipient.id,
                    }));

                    $added = theSet;
                }} id={recipient.id} icon="close" />
            {/if}
        {/each}
    {/if}

    <div class="utilities-wrapper">
        <input
            id="searchBox"
            class="searchbox"
            placeholder="Search recipients and groups"
            bind:value={searchValue}
            on:input={onSearchChange}
            type="text"
            name="searchBox"
        />
        <div class="search-button-wrapper">
            <button
                type="button"
                id="searchButton"
                class="search-button"
                on:click={() => {
                    searchValue = "";
                }}
                ><span id="searchIcon" class="search-icon material-icons-round"
                    >close</span
                ></button
            >
        </div>
    </div>


    {#if searchValue.length > 1}
        {#await $profileStore then [profiles, count]}
            {#each profiles as profile}
                <RecipientProfileButton
                    action={() => {
                        $added = $added.add(JSON.stringify({
                            type: "profile",
                            id: profile.id,
                        }));
                    }}
                    id={profile.id}
                    icon="add"
                />
            {/each}
        {/await}
        {#await $groupStore then [groups, count]}
            {#each groups as group}
                <RecipientGroupButton
                    action={() => {
                        $added = $added.add(JSON.stringify({
                            type: "group",
                            id: group.id,
                        }));
                    }}
                    id={group.id}
                    icon="add"
                />
            {/each}
        {/await}
    {/if}
</form>

<style>
    h2 {
        text-align: center;
    }

    form {
        width: 100%;
    }

    .post-wrapper {
        display: flex;
        width: 100%;
        flex-direction: row;
    }

    button.post {
        font-family: Rubik, sans-serif;
        padding: 2rem 2rem;
        background: var(--accent-blue);
        color: white;
        border-radius: 0.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
    }

    button.post:hover {
        filter: brightness(0.9);
    }

    .searchbox {
        border-radius: 9999px;
        box-sizing: border-box;
        padding-left: 2.5rem;
        width: 100%;
        height: 100%;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        background: var(--bg-grey);
        outline: none;
        border: none;
        font-family: Rubik, sans-serif;
        font-size: 0.9rem;
    }

    .searchbox:focus {
        outline: none;
    }

    @media screen and (min-width: 1380px) {
        .searchbox {
            border-top-left-radius: 9999px;
            border-bottom-left-radius: 9999px;
        }
    }

    .utilities-wrapper {
        border-radius: 9999px;
        width: 100%;
        height: 3rem; /* 56px */
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .search-button-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        /* height: 100%; */
        border-radius: 9999px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background: lightgray;
    }

    .search-button {
        border-radius: 9999px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        box-sizing: border-box;
        padding: 1rem;
        transition: all 200ms;
        background: var(--bg-grey);
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .search-button:hover {
        filter: brightness(0.9);
    }

    .search-button:focus {
        outline: none;
        filter: brightness(0.9);
    }
</style>
