<script lang="ts">
import { filterReflections } from "api/Reflection";

import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import ReflectionsList from "lib/components/generic/ReflectionsList.svelte";
import BigGroupCard from "lib/components/groups/BigGroupCard.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";

    export let meta;
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <CenterWrapper>
            <BigGroupCard group_id={meta.params.id}/>
            <ReflectionsList fetcher={filterReflections} kind="groupReflections" args={[
                {
                    date_added: 'desc'
                },
                {
                    profile: {
                        group_id: meta.params.id
                    }
                }
            ]}/>
        </CenterWrapper>
    </Container>
</CenterWrapper>

