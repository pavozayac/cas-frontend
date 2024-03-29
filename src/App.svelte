<script lang="ts">
  import ManageProfilesRoute from "routes/profiles/ManageProfilesRoute.svelte";
  import ManageNotificationsRoute from "routes/notifications/ManageNotificationsRoute.svelte";
  import NotificationsRoute from "routes/notifications/NotificationsRoute.svelte";
  import Announcer from "lib/components/announcer/Announcer.svelte";
  import Notifications from "lib/components/notifications/Notifications.svelte";
  import { meta, Route, router } from "tinro";
  import Nav from "lib/components/navigation/Nav.svelte";
  import Index from "routes/index.svelte";
  import SignIn from "routes/signin/SignInRoute.svelte";
  import SideMenu from "lib/components/navigation/SideMenu.svelte";
  import ProfilesRoute from "routes/profiles/CurrentProfileRoute.svelte";
  import CurrentProfileRoute from "routes/profiles/CurrentProfileRoute.svelte";
  import Container from "lib/components/Container.svelte";
  import EditProfile from "routes/profiles/EditProfile.svelte";
  import AddReflectionRoute from "routes/reflections/AddReflectionRoute.svelte";
  import BookmarksRoute from "routes/bookmarks/BookmarksRoute.svelte";
  import ConfirmEmailRoute from "routes/confirmation_and_recovery/ConfirmEmailRoute.svelte";

  import { currentProfile, getProfile } from "api/Profile";
  import { onMount } from "svelte";
  import { profileStore } from "stores/profile";
  import RecoverPasswordRoute from "routes/confirmation_and_recovery/RecoverPasswordRoute.svelte";
  import ResetPasswordRoute from "routes/confirmation_and_recovery/ResetPasswordRoute.svelte";
  import RegisterRoute from "routes/register/RegisterRoute.svelte";
  import CreateGroupRoute from "routes/groups/CreateGroupRoute.svelte";
  import GroupsRoute from "routes/groups/GroupsRoute.svelte";
  import GroupRoute from "routes/groups/GroupRoute.svelte";
  import EditGroupRoute from "routes/groups/EditGroupRoute.svelte";
  import { swr } from "api/swr";
  import ManageGroupRoute from "routes/groups/ManageGroupRoute.svelte";
  import MembersRoute from "routes/groups/MembersRoute.svelte";
  import BigProfileCard from "lib/components/profiles/BigProfileCard.svelte";
  import Protected from "lib/components/auth/Protected.svelte";
  import Unprotected from "lib/components/auth/Unprotected.svelte";
  import EditReflectionRoute from "routes/reflections/EditReflectionRoute.svelte";
  import GroupJoinRequests from "routes/groups/GroupJoinRequests.svelte";
  import GroupStatistics from "routes/groups/GroupStatistics.svelte";
  import MemberStatistics from "routes/groups/MemberStatistics.svelte";

  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js';

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, DoughnutController, ArcElement, Legend, Tooltip);
  // Chart.defaults.plugins.legend.display = true;

  // const [profileStore] = swr(currentProfile, "currentProfile", []);


  // onMount(()=>{
  //   (async function (){
  //     $profileStore = await currentProfile()
  //   })()
  // })

  // $: authed = $profileStore !== null;
  // onMount(() => {
  //   profileStore.subscribe((value) => {
  //     if (value !== null) {
  //       console.log("value");
  //       console.log(value);
  //       authed = true;
  //     } else {
  //       authed = false;
  //     }
  //   });

  // setInterval(()=>{
  //   console.log($profileStore)
  //   console.log(localStorage.getItem('profileStore'))
  // }, 500)
  // });

  // let [profileData, reload] = swr(currentProfile, "currentProfile", []);
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="site.webmanifest" />

  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
    rel="stylesheet"
  />

  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />

  <title>CAS Portal</title>
</svelte:head>
<!-- 
{@debug $profileStore}
{@debug authed} -->

<!-- Unprotected -->

<Announcer />

<Route path="/sign-in">
  <Unprotected>
    <SignIn />
  </Unprotected>
</Route>
<Route path="/register">
  <Unprotected>
    <RegisterRoute />
  </Unprotected>
</Route>
<Route path="/confirm-email/:code" let:meta>
  <Unprotected>
    <ConfirmEmailRoute {meta} />
  </Unprotected>
</Route>
<Route path="/forgot-my-password">
  <Unprotected>
    <RecoverPasswordRoute />
  </Unprotected>
</Route>
<Route path="/reset-password/:code" let:meta>
  <Unprotected>
    <ResetPasswordRoute {meta} />
  </Unprotected>
</Route>
<Route fallback redirect="/sign-in" />

<!-- Protected -->

<Route path="/" let:meta>
  <Protected>
    <Index query={meta.query} />
  </Protected>
</Route>

<Route path="/bookmarks">
  <Protected>
    <BookmarksRoute />
  </Protected>
</Route>

<Route path="/notifications">
  <Protected>
    <NotificationsRoute />
  </Protected>
</Route>

<Route path="/notifications/manage">
  <Protected admin>
    <ManageNotificationsRoute />
  </Protected>
</Route>

<Route path="/profiles/*">
  <Route path="/current/edit">
    <Protected>
      <EditProfile />
    </Protected>
  </Route>
  <Route path="/others/:id" let:meta>
    <Protected>
      <BigProfileCard {meta} />
    </Protected>
  </Route>
  <Route fallback path="/current">
    <Protected>
      {#await $profileStore then profile}
        <CurrentProfileRoute {profile} />
      {/await}
    </Protected>
  </Route>
</Route>

<Route path="/add-reflection">
  <Protected>
    <AddReflectionRoute />
  </Protected>
</Route>

<Route path="/reflection/:id/edit" let:meta>
  <Protected>
    <EditReflectionRoute reflection_id={Number(meta.params.id)} />
  </Protected>
</Route>

<Route path="/groups/*">
  <Route path="/">
    <Protected>
      <GroupsRoute />
    </Protected>
  </Route>
  <Route path="/:id/*" let:meta>
    <Route path="/">
      <Protected>
        <GroupRoute {meta} />
      </Protected>
    </Route>
    <Route path="/edit">
      <Protected admin>
        <EditGroupRoute {meta} />
      </Protected>
    </Route>
    <Route path="/manage-group">
      <Protected admin redirect_route="/">
        <ManageGroupRoute profile_id={$profileStore.id} {meta} />
      </Protected>
    </Route>
    <Route path="/members">
      <Protected admin redirect_route="/">
        <MembersRoute group_id={meta.params.id} />
      </Protected>
    </Route>
    <Route path="/join-requests">
      <Protected admin redirect_route="/">
        <GroupJoinRequests group_id={meta.params.id} />
      </Protected>
    </Route>
    <Route path="/statistics">
      <Protected admin redirect_route="/">
        <GroupStatistics group_id={meta.params.id} />
      </Protected>
    </Route>
    <Route path="/statistics/:profile_id" let:meta={profile_stat_meta}>
      <Protected admin redirect_route="/">
        <MemberStatistics group_id={meta.params.id} profile_id={profile_stat_meta.params.profile_id} />
      </Protected>
    </Route>
  </Route>
</Route>

<Route path="/create-group">
  <Protected admin>
    <CreateGroupRoute />
  </Protected>
</Route>

<Route path="/manage-users">
  <Protected admin>
    <ManageProfilesRoute />
  </Protected>
</Route>
<!-- {/await} -->
