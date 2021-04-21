<script lang="ts">
    import Carousel from './Carousel.svelte'
    let pics_urls = [
        'https://placekitten.com/1280/720',
        'https://placekitten.com/1920/1080',
        'https://placekitten.com/1366/768',
        'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
    ]
</script>

<div class="container bg-white border-2 w-full flex flex-col rounded-lg text-center my-5">
    <div class="w-full p-0 h-full bg-grey-200">
       <Carousel urls={pics_urls}/>
    </div>
    <div class="p-5 md:px-10 text-justify">
        <h2 class="text-2xl font-bold mb-4">
            Lorem ipsum dolor sit amet.
        </h2>
        <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in viverra leo, sed finibus enim. Quisque dignissim a felis quis mollis. Praesent quis dignissim justo, id lacinia neque. Morbi laoreet, orci at luctus hendrerit, velit nibh scelerisque urna, et scelerisque dolor dolor in justo. Maecenas eleifend non nibh eget aliquam. Curabitur id pellentesque arcu. Nulla sodales vel enim sed aliquam.
        </h3>
        <div class="py-5 flex flex-row justify-around items-center w-full space-x-4 text-gray-700 font-sans font-light">
            <button><span class="material-icons-outlined">star</span>Favourite</button>
            <button><span class="material-icons-outlined">comment</span>Comment</button>
        </div>
    </div>
    
</div>

<style lang="postcss">

    span {
        @apply mr-2;
        font-size: 1.2rem;
    }
    
    button {
        font-family: Rubik, sans-serif;
        @apply bg-teal-400 border-none border-gray-300 font-medium text-black hover:bg-teal-300 focus:bg-gray-400 w-full py-2 px-6 rounded-lg text-lg cursor-pointer transition-all duration-300 flex items-center justify-center uppercase;
    }

</style>