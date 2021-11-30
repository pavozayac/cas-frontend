<script lang="ts">
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

  import { currentProfile } from "api/Profile";
  import { onMount } from "svelte";
  import { profileStore } from "stores/profile";
import RecoverPasswordRoute from "routes/confirmation_and_recovery/RecoverPasswordRoute.svelte";
import ResetPasswordRoute from "routes/confirmation_and_recovery/ResetPasswordRoute.svelte";
import RegisterRoute from "routes/register/RegisterRoute.svelte";
import CreateGroupRoute from "routes/groups/CreateGroupRoute.svelte";
import GroupsRoute from "routes/groups/GroupsRoute.svelte";

  // onMount(()=>{
  //   (async function (){
  //     $profileStore = await currentProfile()
  //   })()
  // })

  let authed = false;
  onMount(() => {
    profileStore.subscribe((value) => {
      if (value !== null) {
        console.log("value");
        console.log(value);
        authed = true;
      } else {
        authed = false;
      }
    });

    // setInterval(()=>{
    //   console.log($profileStore)
    //   console.log(localStorage.getItem('profileStore'))
    // }, 500)
  });
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

{#if JSON.parse(localStorage.getItem("profileStore")) == null}
  <Route>
    <Route path="/sign-in">
      <SignIn />
    </Route>
    <Route path="/register">
      <RegisterRoute />
    </Route>
    <Route path="/confirm-email/:code" let:meta>
      <ConfirmEmailRoute {meta}/>
    </Route>
    <Route path="/forgot-my-password">
      <RecoverPasswordRoute />
    </Route>
    <Route path='/reset-password/:code' let:meta>
      <ResetPasswordRoute {meta} />
    </Route>
    <Route fallback redirect="/sign-in" />
  </Route>
{:else}
  <Route fallback path="/">
    <Index />
  </Route>

  <Route path="/bookmarks">
    <BookmarksRoute />
  </Route>

  <Route path="/profiles/*">
    <Route path="/current">
      <CurrentProfileRoute />
    </Route>
    <Route path="/current/edit">
      <EditProfile />
    </Route>
  </Route>

  <Route path="/add-reflection">
    <AddReflectionRoute />
  </Route>

  <Route path="/groups">
    <GroupsRoute />
  </Route>

  <Route path="/create-group">
    <CreateGroupRoute />
  </Route>
{/if}
