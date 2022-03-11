<script lang="ts">
    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { swr } from "api/swr";
    import { writable } from "svelte/store";
    import { filterProfiles } from "api/Profile";
    import MemberCard from "lib/components/groups/MemberCard.svelte";
    import PlaceHolderCard from "lib/components/generic/PlaceHolderCard.svelte";
    import { sortChange } from "api/utils";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import Select from "lib/components/generic/Select.svelte";
    import Pager from "lib/components/generic/Pager.svelte";
    import { pageLimit } from "lib/constants";
    import Notifications from "lib/components/notifications/Notifications.svelte"

    const pageStore = writable(0);

    const profileArgs = writable({
        filters: {},
        sorts: {
            graduation_year: "asc",
        },
        pagination: {
            limit: pageLimit,
            page: 0,
        },
    });

    let [profilesStore, reload] = swr(filterProfiles, "profiles", [
        $profileArgs,
    ]);

    function onSearchChange(e) {
        if (searchValue.length > 1) {
            $profileArgs = {
                ...$profileArgs,
                filters: {
                    full_text_con: searchValue,
                },
            };
            reload([$profileArgs]);
        } else {
            $profileArgs = {
                ...$profileArgs,
                filters: {},
            };
            reload([$profileArgs]);
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
            <h1>
                <span class="material-icons-round">manage_accounts</span>
                Manage users
            </h1>

            <LeftCenterRightFlex>
                <Select
                    slot="right"
                    box={false}
                    change={(value) =>
                        sortChange(value, profileArgs, pageStore, reload)}
                    label="Sort by"
                    options={[
                        {
                            value: {
                                last_name: "asc",
                            },
                            text: "Last name A-Z",
                        },
                        {
                            value: {
                                last_name: "desc",
                            },
                            text: "Last name Z-A",
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
                    ]}
                />
            </LeftCenterRightFlex>

            <div class="utilities-wrapper">
                <input
                    id="searchBox"
                    class="searchbox"
                    placeholder="Search users"
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
            <div class="profilesList">
                {#await $profilesStore then [profiles, count]}
                    {#if count > 0}
                        {#each profiles as profile}
                            <MemberCard reload={() => reload([$profileArgs])} deleteButton={false} deleteProfile id={profile.id} />
                        {/each}
                        <Pager args={profileArgs} {count} {reload} {pageStore}/>
                    {:else}
                        <PlaceHolderCard heightRem={5} kindPlural="users" />
                    {/if}
                {/await}
            </div>
        </CenterWrapper>
    </Container>
</CenterWrapper>

<style>
    .profilesList {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .searchbox {
        border-radius: 9999px;
        box-sizing: border-box;
        padding-left: 2.5rem;
        width: 100%;
        height: 100%;
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
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
