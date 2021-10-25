<script lang="ts">
  import { Route, router } from 'tinro'
  import Nav from 'lib/components/navigation/Nav.svelte'
  import Index from 'routes/index.svelte'
  import SignIn from 'routes/signin/SignInRoute.svelte'
  import SideMenu from 'lib/components/navigation/SideMenu.svelte'
  import ProfilesRoute from 'routes/profiles/CurrentProfileRoute.svelte'
import CurrentProfileRoute from 'routes/profiles/CurrentProfileRoute.svelte'

</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="site.webmanifest"/>

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <title>CAS Portal</title>
</svelte:head>


<Route path='/'>
  <Index/>
</Route>
<Route path='/sign-in'>
  <SignIn/>
</Route>
<Route path='/profiles/*'>
  <Route path='/current'>
    <CurrentProfileRoute/>
  </Route>
</Route>