<script lang="ts">
    import Carousel from './Carousel.svelte'
    let pics_urls = [
        'https://placekitten.com/1280/720',
        'https://placekitten.com/1920/1080',
        'https://placekitten.com/1366/768',
        'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
    ]
</script>

<div class="container bg-red-100 w-full flex flex-col rounded-lg text-center my-5">
    <div class="w-full p-0 h-full rounded-lg">
       <Carousel urls={pics_urls}/>
    </div>
    <div class="px-5 md:px-10 text-justify">
        <p class="text-lg text-red-300">
            Lorem ipsum dolor sit amet.
        </p>
        <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in viverra leo, sed finibus enim. Quisque dignissim a felis quis mollis. Praesent quis dignissim justo, id lacinia neque. Morbi laoreet, orci at luctus hendrerit, velit nibh scelerisque urna, et scelerisque dolor dolor in justo. Maecenas eleifend non nibh eget aliquam. Curabitur id pellentesque arcu. Nulla sodales vel enim sed aliquam.
        </h3>
        <div class="p-5 flex flex-row justify-end w-auto">
            <button>Favourite</button>
            <button>Comment</button>
        </div>
    </div>
    
</div>

<style lang="postcss">
    
    button {
        @apply bg-white mr-2 ml-2 hover:bg-red-300  py-2 px-6 rounded-full text-lg border-gray-500 text-black font-semibold border-none cursor-pointer;
    }

    
</style>