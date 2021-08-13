<script lang="ts">
    import Svg from 'svelte-inline-svg';
    import Tiles from './SideMenu.svelte';
    import { fade } from 'svelte/transition'
    import { menuVisible } from 'stores/nav'
    import DropDownNavMenu from 'lib/components/navigation/DropDownNavMenu.svelte'

    import { Link, link } from 'svelte-routing'

    
    let navVisible: boolean = true;
    let y1:number = 0, y2: number;
    let nav: HTMLElement;
    let navBorder: HTMLElement;

    let mouseX: number, mouseY: number;

    const maxDelta: number = 30;

    function handleMousemove (e: MouseEvent) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    $: {    
        let delta: number = y2 - y1;
        console.log(delta)
        y1 = y2;

        if(delta > maxDelta){
            navVisible = false;
            nav.style.top = "-100%";
        } else if (delta < -maxDelta || nav && (y2 < nav.clientHeight) || nav && (mouseY < nav.clientHeight)){
            navVisible = true;
            nav.style.top = "0";
        }
    }

    /*$: {
        if (y2 == 0){
            navBorder && navBorder.classList.remove("bHidden");
            navBorder && navBorder.classList.add("bShown");

        } else {
            navBorder && navBorder.classList.remove("bShown");
            navBorder && navBorder.classList.add("bHidden");
        }
    }*/


</script>

<svelte:window bind:scrollY={y2}/>
<svelte:body on:mousemove={handleMousemove} />

<div class="nav-wrapper"  bind:this={nav}>
<nav>
    <!--<div bind:this={navBorder} class={`-z-1 absolute h-full p-4 border-b-3 border-gray-300 transition-all duration-500 ${y2 == 0 ? "w-0 left-1/2 opacity-0" : "w-full left-0"}`}></div>-->
    
    <!--<button on:click={()=>$tilesVisible = true}><span id="navIcon" class={`md:hidden material-icons-round`}>menu</span></button>    -->
    
    <div class="logo-wrapper">
        <Link to="/">
            <button class="logo">
                <svg class="logo-svg" width="203.3mm" height="78.868mm" version="1.1" viewBox="0 0 203.3 78.868" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                    <metadata>
                     <rdf:RDF>
                      <cc:Work rdf:about="">
                       <dc:format>image/svg+xml</dc:format>
                       <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                       <dc:title/>
                      </cc:Work>
                     </rdf:RDF>
                    </metadata>
                    <g transform="translate(1.6524 -60.566)">
                     <path d="m152.82 73.264a19.991 19.246 0 0 0-28.271 0 19.991 19.246 0 0 0-4.7e-4 27.219l33.125 31.891 28.271-27.219z" fill="#00e676" opacity=".8"/>
                     <path d="m190.8 73.264a19.991 19.246 0 0 0-28.271-3e-6l-33.125 31.891 28.271 27.218 33.125-31.891a19.991 19.246 0 0 0 0-27.218z" fill="#00e676" opacity=".8"/>
                     <g fill="#1e88e5">
                      <path d="m51.113 90.197a23.883 23.883 0 0 1-23.883 23.883 23.883 23.883 0 0 1-23.883-23.883 23.883 23.883 0 0 1 23.883-23.883 23.883 23.883 0 0 1 23.883 23.883z" opacity=".8"/>
                      <g stroke-linecap="round" stroke-linejoin="round">
                       <path d="m27.23 89.265a11.197 10.957 0 0 0-11.197 10.957v33.463h22.393v-33.463a11.197 10.957 0 0 0-11.197-10.957z" opacity=".8" stroke-width=".79816"/>
                       <path d="m16.034 118.07h22.393v3.9736h-22.393z" opacity=".8" stroke-width=".70009"/>
                       <path d="m16.034 125.52h22.393v3.9736h-22.393z" opacity=".8" stroke-width=".70009"/>
                      </g>
                     </g>
                     <path d="m94.062 65.566-19.67 20.845-19.671 20.845h39.341z" fill="#f50057" opacity=".8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.0272"/>
                     <path d="m75.153 134.43 19.67-20.845 19.671-20.845h-39.341z" fill="#f50057" opacity=".8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.0272"/>
                    </g>
                </svg>
                <div class="logo-text-wrapper"><span class="logoTextBold">CAS</span> Portal</div>
            </button>
        </Link>
    </div>

    <div class="utilities-wrapper">
        <button class="menu-icon" on:click={()=>$menuVisible = !$menuVisible}><span class="material-icons-round">menu</span></button>
        <input id="searchBox" class="searchbox" placeholder="Search"/>
        <div class="search-button-wrapper">
            <button id="searchButton" class="search-button"><span id="searchIcon" class="search-icon material-icons-round">search</span></button>
        </div>
        <DropDownNavMenu />
    </div>
    

    <!--<div>
        <span class="logoLetters text-3xl text-blue-500">c</span>
        <span class="logoLetters text-3xl text-red-500">a</span>
        <span class="logoLetters text-3xl text-green-500">s</span>
    </div>-->

    <div class="sign-in-button-wrapper">
        <Link to="sign-in" style="text-decoration: none">
            <div class="sign-in-button">
                <span id="lockIcon" class="material-icons-round">lock</span>Sign in
            </div>
        </Link>
    </div>

</nav>
</div>

<style>
    @font-face {
        font-family: Product-Sans;
        src: url("../../../assets/fonts/ProductSansRegular.ttf");
    }

    @font-face {
        font-family: Product-Sans-Bold;
        src: url("../../../assets/fonts/ProductSansBold.ttf");
    }

    .nav-wrapper {
        position: fixed;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        background: transparent;
        padding: 0.5rem;
        transition: all 500ms;
    }
    nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        /*flex-direction: row;
        justify-content: space-between;*/
        border-radius: 0.5rem;
        
        /*justify-content: space-between;
        align-items: center;*/
        background: transparent;
        height: 4rem;
    }

    .logo-wrapper {
        flex: 1;
        height: 3rem; 
        overflow: hidden;
    }

    .logo {
        border-radius: 9999px;
        cursor: pointer;
        display: none;
        flex-direction: row;
        flex-shrink: 1;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 100%;
        padding: 0 1rem;
        transition: all 200ms;
        background: var(--bg-grey);
    }
    
    .logo:focus {
        outline: none;
    }

    .logo:hover {
        background: var(--bg-grey-lower);

    }
    
    

    .logo-svg {
        width: 100px;
        height: 30px;
    }

    .logo-text-wrapper {
        color: #555;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 1024px) {
        .logo-text-wrapper {
            display: none;
        }
    }

    .utilities-wrapper {
        position: relative;
        border-radius: 9999px;
        width: 100%;
        height: 3rem; /* 56px */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-icon {
        background: var(--bg-grey-lower);
        height: 100%;
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
        padding-left: 1rem;
        padding-right: 0.5rem;
        transition: all 200ms;
        cursor: pointer;
    }

    .menu-icon:hover {
        filter: brightness(.9);
    }

    @media screen and (min-width: 1380px) {
        .menu-icon {
            display: none;
        }
    }

    .searchbox {
        border-radius: 9999px;
        box-sizing: border-box;
        padding-left: 2.5rem;
        width: 100%;
        height: 100%;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        background: var(--bg-grey-lower);
        outline: none;
        border: none;
    }
    
    .searchbox:focus {
        outline: none;
    }

    @media screen and (min-width: 1380px) {
        .searchbox {
            border-top-left-radius: 9999px;
            border-bottom-left-radius: 9999px;
        }
    }

    .search-button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-radius: 9999px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background: lightgray;
    }

    .search-button {
        height: 100%;
        border-radius: 9999px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding-right: 1rem;
        padding-left: 0.5rem;
        transition: all 200ms;
        background: var(--bg-grey-lower);
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .search-button:hover {
        filter: brightness(.9);
    }

    .search-button:focus {
        outline: none;
        filter: brightness(.9);
    }

    .search-icon {
        color: black;
        /*padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;*/
    }

    .sign-in-button-wrapper {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        height: 3rem;
    }


    .sign-in-button {
        font-family: Rubik, sans-serif;
        height: 100%;
        display: none;
        background: var(--accent-blue);
        color: white;
        border-radius: 9999px;
        padding-left: 1rem;
        padding-right: 1rem;
        cursor: pointer;
        transition: all 300ms;
        text-align: center;
        font-size: 1rem;
        text-decoration: none;
    }

    .sign-in-button:focus {
        filter: brightness(1.1);
        outline: none;
    }

    .sign-in-button:hover {
        filter: brightness(1.1);
    }

    @media screen and (min-width: 768px) {
        .sign-in-button {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    button {
        font-family: Rubik, sans-serif;
        font-display: swap;
        border: 0;
        outline: 0;
    }
    
    #lockIcon {
        font-size: 1.25rem; /* 20px */
        margin-right: 0.5rem; /* 8px */
    }

    .logoText {
        font-family: Product-Sans, sans-serif;
    }

    .logoTextBold {
        font-family: Product-Sans-Bold, sans-serif;
    }

    @media screen and (min-width: 768px) {
        #navIcon {
            display: none;
        }
    }

    #searchIcon {
        font-size: 1.875rem; /* 30px */

    }

    #searchBox {
        font-family: Rubik, sans-serif;
        font-size: 1.125rem; /* 18px */
        color: #222;
    }

    #searchBox::placeholder {
        font-family: Rubik, sans-serif;
        font-size: 1.125rem;
        line-height: 250%;
        color: #444;
    }

    #searchBox:focus  {
        filter: brightness(.9);
    }

    @media screen and (min-width: 768px) {
        .logo {
            display: flex;
        }
        nav {
            padding: 1rem;
        }

        .nav-wrapper {
            background: var(--bg-grey);
            border-bottom: 2px solid var(--bg-grey-lower);
        }

        .utilities-wrapper {
            width: 40%;
        }
    }   
</style>