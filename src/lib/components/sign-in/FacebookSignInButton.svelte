<script lang="ts">
import { profileStore } from "stores/profile";

import { onDestroy, onMount } from "svelte";


    function statusChangeCallback(res) {
        console.log(res);
    }

    function checkLoginState() {
        FB.getLoginStatus(function (statusRes) {
            console.log(statusRes['signedRequest'])
            FB.api(
                "/me",
                { fields: "first_name,last_name,email" },
                function (res) {
                    console.log(res)
                    fetch('https://localhost:8000/auth/facebook', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            signed_request: statusRes['authResponse']['signedRequest'],
                            ...res
                        }),
                        mode: 'no-cors',
                        credentials: 'include'
                    }).then(res=>profileStore.set(res.json()))
                }
            );
        });
    };

    window.fbAsyncInit = function () {
        FB.init({
            appId: "137287201899363",
            cookie: true, // Enable cookies to allow the server to access the session.
            xfbml: true, // Parse social plugins on this webpage.
            version: "v11.0", // Use this Graph API version for this call.
        });

        FB.AppEvents.logPageView();

        FB.getLoginStatus(function (res) {
            statusChangeCallback(res);
        });
    };
    let js, fjs

    onMount(()=>{(function (d, s, id) {
        console.log('bruh')
        js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    })

    function facebookButtonClick() {
        FB.login(function(res){
            console.log(res)
            checkLoginState()
        }, {scope: 'email, public_profile'})
    }
</script>

<button class="facebook-button" on:click={facebookButtonClick}><img class="facebook-logo" src="/graphics/facebook_logo.png"/>Log in with Facebook</button>

<style>
    .facebook-button {
        width: 100%;
        height: 3rem;
        padding: 1rem;
        font-family: Rubik, sans-serif;
        border-radius: 0.5rem;
        color: white;
        background-color: #1877F2;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .facebook-logo {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
    }
</style>