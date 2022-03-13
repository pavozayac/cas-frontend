<script lang="ts">
    import { filterGroups } from "api/Groups";
    import { currentProfile } from "api/Profile";

    import { swr } from "api/swr";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Pager from "lib/components/generic/Pager.svelte";
    import GroupBoxes from "lib/components/groups/GroupBoxes.svelte";
    import GroupCard from "lib/components/groups/GroupCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { pageLimit } from "lib/constants";
    import { writable } from "svelte/store";
    import Notifications from "lib/components/notifications/Notifications.svelte";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import Select from "lib/components/generic/Select.svelte";
    import { sortChange, filterChange } from "api/utils";

    const pageStore = writable(0);
    const args = writable({
        sorts: {
            date_created: "desc",
        },
        filters: {},
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });

    let [groupList, reload] = swr(filterGroups, "filterGroups", [$args]);

    function onSearchChange(e) {
        if (searchValue.length > 1) {
            $args = {
                ...$args,
                filters: {
                    full_text_con: searchValue,
                },
            };
            reload([$args]);
        } else {
            $args = {
                ...$args,
                filters: {},
            };
            reload([$args]);
        }
    }

    let searchValue: string = "";
</script>

<Nav />
<Notifications />
<SideMenu />

<CenterWrapper>
    <Container
        style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
    >
        <CenterWrapper>
            <GroupBoxes />
            <LeftCenterRightFlex>
                <Select
                    slot="right"
                    box={false}
                    change={(value) =>
                        sortChange(value, args, pageStore, reload)}
                    label="Sort by"
                    options={[
                        {
                            value: {
                                date_created: "desc",
                            },
                            text: "Most recent",
                        },
                        {
                            value: {
                                date_created: "asc",
                            },
                            text: "Least recent",
                        },
                        {
                            value: {
                                graduation_year: "asc",
                            },
                            text: "Graduation year asc.",
                        },
                        {
                            value: {
                                graduation_year: "desc",
                            },
                            text: "Graduation year desc.",
                        },
                        {
                            value: {
                                name: "asc",
                            },
                            text: "Group name A-Z",
                        },
                        {
                            value: {
                                name: "desc",
                            },
                            text: "Group name Z-A",
                        },
                    ]}
                />
            </LeftCenterRightFlex>

            <div class="utilities-wrapper">
                <input
                    id="searchBox"
                    class="searchbox"
                    placeholder="Search groups by name, graduation year"
                    bind:value={searchValue}
                    on:input={onSearchChange}
                    type="text"
                    name="searchBox"
                    autocomplete="off"
                />
                <div class="search-button-wrapper">
                    <button
                        type="button"
                        id="searchButton"
                        class="search-button"
                        on:click={() => {
                            searchValue = "";
                        }}
                        ><span
                            id="searchIcon"
                            class="search-icon material-icons-round">close</span
                        ></button
                    >
                </div>
            </div>
            {#await $groupList then [groups, count]}
                <div class="groups-wrapper">
                    {#each groups as group}
                        <GroupCard manage group_id={group.id} />
                    {/each}
                </div>
                <Pager {count} {reload} {args} {pageStore} />
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>

<style>
    .groups-wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .searchbox {
        border-radius: 9999px;
        box-sizing: border-box;
        padding-left: 2.5rem;
        width: 100%;
        height: 100%;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
        background: var(--bg-grey);
        outline: none;
        border: none;
        font-family: Rubik, sans-serif;
        font-size: 0.9rem;
    }

    .searchbox:focus {
        outline: none;
    }
    /* 
    @media screen and (min-width: 1380px) {
        .searchbox {
        }
    } */

    .utilities-wrapper {
        border-radius: 9999px;
        width: 100%;
        height: 3rem; /* 56px */
        display: flex;
        align-items: center;
        justify-content: center;

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
