<script>
    import Lazy from "lib/components/lazy/Lazy.svelte";
    import { meta, Route, router } from "tinro";
    const Nav = () => import("lib/components/navigation/Nav.svelte");
    const Index = () => import("routes/index.svelte");
    // import SignIn from "routes/signin/SignInRoute.svelte";
    const SignIn = () => import('routes/signin/SignInRoute.svelte');
    const SideMenu = () => import("lib/components/navigation/SideMenu.svelte");
    const ProfilesRoute = () => import("routes/profiles/CurrentProfileRoute.svelte");
    const CurrentProfileRoute = () => import("routes/profiles/CurrentProfileRoute.svelte");
    const Container = () => import("lib/components/Container.svelte");
    const EditProfile = () => import("routes/profiles/EditProfile.svelte");
    const AddReflectionRoute = () => import("routes/reflections/AddReflectionRoute.svelte");
    const BookmarksRoute = () => import("routes/bookmarks/BookmarksRoute.svelte");
    const ConfirmEmailRoute = () => import("routes/confirmation_and_recovery/ConfirmEmailRoute.svelte");
  
    import { currentProfile, getProfile } from "api/Profile";
    import { onMount } from "svelte";
    import { profileStore } from "stores/profile";
    const RecoverPasswordRoute = () => import("routes/confirmation_and_recovery/RecoverPasswordRoute.svelte");
    const ResetPasswordRoute = () => import("routes/confirmation_and_recovery/ResetPasswordRoute.svelte");
    const RegisterRoute = () => import("routes/register/RegisterRoute.svelte");
    const CreateGroupRoute = () => import("routes/groups/CreateGroupRoute.svelte");
    const GroupsRoute = () => import("routes/groups/GroupsRoute.svelte");
    const GroupRoute = () => import("routes/groups/GroupRoute.svelte");
    const EditGroupRoute = () => import("routes/groups/EditGroupRoute.svelte");
    import { swr } from "api/swr";
    const ManageGroupRoute = () => import("routes/groups/ManageGroupRoute.svelte");
    const MembersRoute = () => import("routes/groups/MembersRoute.svelte");
    const BigProfileCard = () => import("lib/components/profiles/BigProfileCard.svelte");
    import Protected from "lib/components/auth/Protected.svelte";
    import Unprotected from "lib/components/auth/Unprotected.svelte";
    const EditReflectionRoute = () => import("routes/reflections/EditReflectionRoute.svelte");
    const GroupJoinRequests = () => import("routes/groups/GroupJoinRequests.svelte");
    const GroupStatistics = () => import("routes/groups/GroupStatistics.svelte");
    const MemberStatistics = () => import("routes/groups/MemberStatistics.svelte");
  
    import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js';
  
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement, DoughnutController, ArcElement, Legend, Tooltip);
    Chart.defaults.plugins.legend.display = true;
  
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
  
  <Route path="/sign-in">
    <Unprotected>
      <Lazy promise={SignIn}/>
      <!-- <SignIn /> -->
    </Unprotected>
  </Route>
  <Route path="/register">
    <Unprotected>
      <Lazy promise={RegisterRoute} />
    </Unprotected>
  </Route>
  <Route path="/confirm-email/:code" let:meta>
    <Unprotected>
      <!-- <ConfirmEmailRoute {meta} /> -->
      <Lazy promise={ConfirmEmailRoute} props={{meta}} />
    </Unprotected>
  </Route>
  <Route path="/forgot-my-password">
    <Unprotected>
      <Lazy promise={RecoverPasswordRoute} />
    </Unprotected>
  </Route>
  <Route path="/reset-password/:code" let:meta>
    <Unprotected>
      <Lazy promise={ResetPasswordRoute} props={{meta}} />
    </Unprotected>
  </Route>
  <Route fallback redirect="/sign-in" />
  
  <!-- Protected -->
  
  <Route path="/" let:meta>
    <Protected>
      <!-- <Index query={meta.query} /> -->
      <Lazy promise={Index} props={{query: meta.query}} />
    </Protected>
  </Route>
  
  <Route path="/bookmarks">
    <Protected>
      <!-- <BookmarksRoute /> -->
      <Lazy promise={BookmarksRoute} />
    </Protected>
  </Route>
  
  <Route path="/profiles/*">
    <Route path="/current/edit">
      <Protected>
        <!-- <EditProfile /> -->
        <Lazy promise={EditProfile} />
      </Protected>
    </Route>
    <Route path="/others/:id" let:meta>
      <Protected>
        <!-- <BigProfileCard {meta} /> -->
        <Lazy promise={BigProfileCard} props={{meta}} />
      </Protected>
    </Route>
    <Route fallback path="/current">
      <Protected>
        <!-- <CurrentProfileRoute /> -->
        <Lazy promise={CurrentProfileRoute} />
      </Protected>
    </Route>
  </Route>
  
  <Route path="/add-reflection">
    <Protected>
      <!-- <AddReflectionRoute /> -->
      <Lazy promise={AddReflectionRoute} />
    </Protected>
  </Route>
  
  <Route path="/reflection/:id/edit" let:meta>
    <Protected>
      <!-- <EditReflectionRoute reflection_id={Number(meta.params.id)} /> -->
      <Lazy promise={EditReflectionRoute} props={{reflection_id: Number(meta.params.id)}} />
    </Protected>
  </Route>
  
  <Route path="/groups/*">
    <Route path="/">
      <Protected>
        <!-- <GroupsRoute /> -->
        <Lazy promise={GroupsRoute} />
      </Protected>
    </Route>
    <Route path="/:id/*" let:meta>
      <Route path="/">
        <Protected>
          <!-- <GroupRoute {meta} /> -->
          <Lazy promise={GroupsRoute} props={{meta}} />
        </Protected>
      </Route>
      <Route path="/edit">
        <Protected>
          <!-- <EditGroupRoute {meta} /> -->
          <Lazy promise={EditGroupRoute} props={{meta}} />
        </Protected>
      </Route>
      <Route path="/manage-group">
        <Protected coordinator {meta} redirect_route="/">
          <!-- <ManageGroupRoute profile_id={$profileStore.id} {meta} /> -->
          <Lazy promise={ManageGroupRoute} props={{profile_id: $profileStore.id, meta}} />
        </Protected>
      </Route>
      <Route path="/members">
        <Protected coordinator {meta} redirect_route="/">
          <!-- <MembersRoute group_id={meta.params.id} /> -->
          <Lazy promise={MembersRoute} props={{group_id: meta.params.id}} />
        </Protected>
      </Route>
      <Route path="/join-requests">
        <Protected coordinator {meta} redirect_route="/">
          <!-- <GroupJoinRequests group_id={meta.params.id} /> -->
          <Lazy promise={GroupJoinRequests} props={{group_id: meta.params.id}} />
        </Protected>
      </Route>
      <Route path="/statistics">
        <Protected coordinator {meta} redirect_route="/">
          <!-- <GroupStatistics group_id={meta.params.id} /> -->
          <Lazy promise={GroupStatistics} props={{group_id: meta.params.id}} />
        </Protected>
      </Route>
      <Route path="/statistics/:profile_id" let:meta={profile_stat_meta}>
        <Protected coordinator {meta} redirect_route="/">
          <!-- <MemberStatistics group_id={meta.params.id} profile_id={profile_stat_meta.params.profile_id} /> -->
          <Lazy promise={MemberStatistics} props={{group_id: meta.params.identity, profile_id: profile_stat_meta.params.profile_id}} />
        </Protected>
      </Route>
    </Route>
  </Route>
  
  <Route path="/create-group">
    <Protected>
      <!-- <CreateGroupRoute /> -->
      <Lazy promise={CreateGroupRoute} />
    </Protected>
  </Route>
  <!-- {/await} -->
  