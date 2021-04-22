<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import Card from './lib/components/Card.svelte'
  import Carousel from './lib/components/Carousel.svelte'
  import Nav from './lib/components/Nav.svelte'
  import Tailwind from './lib/Tailwind.svelte'
  import TileMenu from './lib/components/TileMenu.svelte'

  let pics_urls = [
    'https://placekitten.com/1280/720',
    'https://placekitten.com/1920/1080',
    'https://placekitten.com/1366/768',
    'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
  ]
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</svelte:head>

<Tailwind/>
<Nav/>
<TileMenu/>

<main>
  <div class="cardContainer">
    <Card />
    <Card />
    <Card />
    <Card />
    <!--<Carousel urls={pics_urls} />-->
  </div>

  <p>
    Visit <a class="text-red-600" href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
</main>

<style lang="postcss">
 


  :global(body){
  
    margin: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-display: swap;
    @apply pt-20;
    
  }

  main {
    @apply container mx-auto flex flex-col items-center w-full p-3;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    @apply text-red-600;
    @apply uppercase;
    @apply text-6xl;
    @apply font-thin;
    @apply leading-tight;
    @apply my-8 mx-auto;
    @apply max-w-xs;
  }

  p {
    @apply max-w-xs;
    margin: 1rem auto;
    @apply leading-snug;
  }

  @screen sm {
    h1 {
      @apply max-w-none;
    }

    p {
      @apply max-w-none;
    }
  }

  .cardContainer {
    @apply lg:w-1/2;
  }
</style>
