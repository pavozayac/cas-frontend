<script lang="ts">
import { currentProfile } from 'api/Profile';
import { route } from 'api/utils';
import { router } from 'tinro';

     import { profileStore } from 'stores/profile'
     import { onMount } from 'svelte';
     // dispa
     onMount(()=>{
          window.handleGoogleSignIn = res => {
               // console.log(res)
               fetch(route('auth/google'), {
                    method: 'POST',
                    body: JSON.stringify(res),
                    mode: 'no-cors',
                    credentials: 'include'
               }).then(res=>{
                    profileStore.set(1);
                    router.goto('/');
               })
               
               console.log($profileStore)
          }
     })
</script>

<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div id="g_id_onload"
     data-client_id="313552019412-aook87f4fdajen34du7hun3vims1iq0t.apps.googleusercontent.com"
     data-callback="handleGoogleSignIn"
     data-auto_prompt="false"
     data-ux_mode="popup"
     style="position: absolute; z-index:1000;">
</div>
<div class="g_id_signin"
     data-type="standard"
     data-size="large"
     data-theme="outline"
     data-text="sign_in_with"
     data-shape="rectangular"
     data-logo_alignment="left"
     data-width="250">
</div>

<style>
     .g_id_signin {
          margin-bottom: 1rem;
     }
</style>