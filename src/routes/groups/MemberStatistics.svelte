<script lang="ts">
    import { filterProfiles, getProfile } from "api/Profile";

    import { filterReflections, getReflection } from "api/Reflection";
    import { swr } from "api/swr";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import BalanceChart from "lib/components/charts/BalanceChart.svelte";
    import MonthBarChart from "lib/components/charts/MonthBarChart.svelte";
    import MonthChartByCategory from "lib/components/charts/MonthChartByCategory.svelte";
    import Container from "lib/components/Container.svelte";
    import InformationTile from "lib/components/generic/InformationTile.svelte";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import MemberCard from "lib/components/groups/MemberCard.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { router, meta } from "tinro";
    import Notifications from "lib/components/notifications/Notifications.svelte";

    export let profile_id;
    export let group_id;

    let year = writable(new Date().getFullYear());

    function formatDate(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    async function fetcher(id: number) {
        const [allBulk] = await filterReflections({
            sorts: {},
            filters: {
                profile: {
                    id: id,
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            pagination: {
                page: 0,
                limit: 0,
            },
        });

        const [creativityBulk] = await filterReflections({
            sorts: {},
            filters: {
                creativity: true,
                profile: {
                    id: id,
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            pagination: {
                page: 0,
                limit: 0,
            },
        });
        const [activityBulk] = await filterReflections({
            sorts: {},
            filters: {
                activity: true,
                profile: {
                    id: id,
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            pagination: {
                page: 0,
                limit: 0,
            },
        });
        const [serviceBulk] = await filterReflections({
            sorts: {},
            filters: {
                service: true,
                profile: {
                    id: id,
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            pagination: {
                page: 0,
                limit: 0,
            },
        });

        const profile = await getProfile(id);

        return [
            Promise.all(allBulk.map(async (v) => await getReflection(v.id))),
            Promise.all(
                creativityBulk.map(async (v) => await getReflection(v.id))
            ),
            Promise.all(
                activityBulk.map(async (v) => await getReflection(v.id))
            ),
            Promise.all(
                serviceBulk.map(async (v) => await getReflection(v.id))
            ),
            profile,
        ];
    }

    const [allStore, reload] = swr(fetcher, "memberAllData", [profile_id]);

    onMount(async () => {
        try {
            const profile = await getProfile(profile_id);
        } catch (err) {
            router.goto(`/groups/${profile_id}/statistics`);
        }
    });
</script>

<Nav />
<Notifications />
<SideMenu />

{#await $allStore then [allData, creativityData, activityData, serviceData, profile]}
    <CenterWrapper>
        <Container
            style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
        >
            <CenterWrapper>
                <LeftCenterRightFlex>
                    <ThinButton
                        slot="left"
                        text="Back to statistics"
                        fullIconName="arrow_back"
                        target={`/groups/${group_id}/statistics`}
                    />

                    <h1 slot="center">Member statistics</h1>

                    <div slot="right" class="wrapper">
                        <div class="year-switcher">
                            <button
                                class="year-button"
                                on:click={() => {
                                    $year = Math.max(
                                        $year - 1,
                                        new Date().getFullYear() - 3
                                    );
                                    reload();
                                }}
                            >
                                <div class="material-icons-round">
                                    arrow_left
                                </div>
                            </button>
                            {$year}
                            <button
                                class="year-button"
                                on:click={() => {
                                    $year = Math.min(
                                        $year + 1,
                                        new Date().getFullYear()
                                    );
                                    reload();
                                }}
                            >
                                <div class="material-icons-round">
                                    arrow_right
                                </div>
                            </button>
                        </div>
                    </div>
                </LeftCenterRightFlex>
                <div class="detail-info">
                    <InformationTile label="Member" iconName="person">
                        {profile.first_name}
                        {profile.last_name}
                    </InformationTile>
                    <InformationTile label="Joined" iconName="star">
                        {new Date(profile.date_joined).getDate()}
                        {new Date(profile.date_joined).toLocaleString("en-us", {
                            month: "short",
                        })}
                        {new Date(profile.date_joined).getFullYear()}
                    </InformationTile>
                    {#await allData then all}
                        <InformationTile
                            label="Total reflections"
                            iconName="view_agenda">{all.length}</InformationTile
                        >
                        <InformationTile
                            label="Reflections per month"
                            iconName="event"
                            >{Number(all.length / 12).toFixed(
                                2
                            )}</InformationTile
                        >
                    {/await}
                </div>
                <div class="balance-chart-wrapper">
                    {#await creativityData then creativity}
                        {#await activityData then activity}
                            {#await serviceData then service}
                                <BalanceChart
                                    slot="left"
                                    creativityData={creativity}
                                    activityData={activity}
                                    serviceData={service}
                                />
                            {/await}
                        {/await}
                    {/await}
                </div>
                {#await allData then all}
                    <MonthBarChart allData={all} />
                {/await}
                {#await creativityData then creativity}
                    {#await activityData then activity}
                        {#await serviceData then service}
                            <MonthChartByCategory
                                creativityData={creativity}
                                activityData={activity}
                                serviceData={service}
                            />
                        {/await}
                    {/await}
                {/await}
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/await}

<style>
    .balance-chart-wrapper {
        width: 50%;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        vertical-align: middle;
    }

    .year-switcher {
        display: flex;
        align-items: center;
        font-weight: 600;
    }

    .year-button {
        background: var(--bg-grey);
        cursor: pointer;
        border-radius: 9999px;
        margin: 0 1rem;
    }

    .year-button:hover {
        filter: brightness(0.9);
    }

    .detail-info {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>
