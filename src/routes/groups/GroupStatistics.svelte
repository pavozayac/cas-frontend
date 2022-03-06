<script lang="ts">
import { filterProfiles } from "api/Profile";

import { filterReflections } from "api/Reflection";
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
import { writable } from "svelte/store";

    export let group_id: string;

    let year = writable(new Date().getFullYear());

    function formatDate(date: Date) {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }

    const onePage = {
        page: 0,
        limit: 0
    }
    
    async function fetcher() {
        const [all] = await filterReflections({
            filters: {
                profile: {
                    group_id: group_id
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            sorts: {},
            pagination: onePage
        })

        const [creativity] = await filterReflections({
            filters: {
                creativity: true,
                profile: {
                    group_id: group_id
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),            
            },
            sorts: {},
            pagination: onePage
        })

        const [activity] = await filterReflections({
            filters: {
                activity: true,
                profile: {
                    group_id: group_id
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            sorts: {},
            pagination: onePage
        })

        const [service] = await filterReflections({
            filters: {
                service: true,
                profile: {
                    group_id: group_id
                },
                date_added_lte: formatDate(new Date($year, 0, 1)),
                date_added_gte: formatDate(new Date($year, 11, 31)),
            },
            sorts: {},
            pagination: onePage
        })

        return [all, creativity, activity, service]
    }

    const [allStore, reload] = swr(fetcher, "allData", []);
    const [profilesStore] = swr(filterProfiles, "profiles", [{
        filters: {
            group_id: group_id
        }, 
        sorts: {
            first_name: 'asc'
        },
        pagination: onePage
    }])
</script>

<Nav />
<SideMenu />

{#await $allStore then [allData, creativityData, activityData, serviceData]}
<CenterWrapper>
    <Container style="background: white; padding: 1.5rem; border-radius: .5rem; box-sizing: border-box;">
        <CenterWrapper>
            <LeftCenterRightFlex>
                <ThinButton slot="left" text="Go back" fullIconName="arrow_back" target={`/groups/${group_id}/manage-group`} />

                <h1 slot="center">Group statistics</h1>
                
                <div slot="right" class="wrapper">
                    <div class="year-switcher">
                        <button class="year-button" on:click={() => { $year = Math.max($year - 1, new Date().getFullYear() - 3); reload(); }}>
                            <div class="material-icons-round">arrow_left</div>
                        </button>
                        {$year}
                        <button class="year-button" on:click={() => { $year = Math.min($year + 1, new Date().getFullYear()); reload(); }}>
                            <div class="material-icons-round">arrow_right</div>
                        </button>
                    </div>
                </div>
            </LeftCenterRightFlex>
            <LeftCenterRightFlex>
                <BalanceChart slot="left" {creativityData} {activityData} {serviceData} />
                <div class="detail-info" slot="right">
                    <InformationTile label="Total reflections" iconName="view_agenda">{allData.length}</InformationTile>
                    <InformationTile label="Reflections per month" iconName="event">{Number(allData.length/12).toFixed(2)}</InformationTile>
                </div>
            </LeftCenterRightFlex>
            <MonthBarChart allData={allData} />
            <MonthChartByCategory creativityData={creativityData} activityData={activityData} serviceData={serviceData}/>
            <h2>Member statistics</h2>
            {#await $profilesStore then profiles}
                {#each profiles as profile}
                <a class="member-link" href={`/groups/${group_id}/statistics/${profile.id}`}>
                    <MemberCard id={profile.id} deleteButton={false}/>
                </a>
                {/each}
            {/await}
        </CenterWrapper>
    </Container>
</CenterWrapper>
{/await}

<style>
    .member-link {
        width: 100%;
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
        filter: brightness(.9);
    }

    .detail-info {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr / 1fr;
        gap: 1rem;
    }
</style>