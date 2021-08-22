<script lang="ts">
    import Card from '../lib/components/Card.svelte'
    import Nav from 'lib/components/navigation/Nav.svelte'
    import SideMenu from 'lib/components/navigation/SideMenu.svelte'

</script>

<Nav/>
<SideMenu/>

<main>
    <div class="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <!--<Carousel urls={pics_urls} />-->
    </div>
</main>

 <style>
    :global(body) {

        margin: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-display: swap;
        text-rendering: optimizeLegibility !important;
    }

    :global(button) {
        outline: none;
        border: 0;
    }
    
    main {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem;
        background: var(--bg-grey);
        padding-top: 4rem;
    }

    .cards-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    

    @media screen and (min-width: 768px) {
        .cards-container {
            max-width: 50%;
        }
    }
</style>
  