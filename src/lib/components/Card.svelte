<script lang="ts">
    import Carousel from './Carousel.svelte'
    let pics_urls = [
        'https://placekitten.com/1280/720',
        'https://placekitten.com/1920/1080',
        'https://placekitten.com/1366/768',
        'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
    ]
</script>

<div class="card-container">
    <div class="top-widgets">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit placeat, eius molestiae, debitis exercitationem deleniti dolores consequuntur ab beatae nobis unde, sapiente aspernatur delectus obcaecati voluptatum possimus similique voluptate.
        </p>
    </div>

    <div class="carousel-wrapper">
       <Carousel urls={pics_urls}/>
    </div>
    <div class="text-section-wrapper">
        <h2>
            Lorem ipsum dolor sit amet.
        </h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in viverra leo, sed finibus enim. Quisque dignissim a felis quis mollis. Praesent quis dignissim justo, id lacinia neque. Morbi laoreet, orci at luctus hendrerit, velit nibh scelerisque urna, et scelerisque dolor dolor in justo. Maecenas eleifend non nibh eget aliquam. Curabitur id pellentesque arcu. Nulla sodales vel enim sed aliquam.
        </p>
        <div class="actions-buttons">
            <button><span class="material-icons-outlined">bookmark_border</span></button>
            <button><span class="material-icons-outlined">comment</span></button>
        </div>
    </div>
</div>

<style lang="postcss">

    .card-container {
        background-color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
    }

    @media screen and (min-width: 648px) {
        .card-container {
            max-width: 648px;
        }
    }

    @media screen and (min-width: 768px) {
        .card-container {
            max-width: 768px;
        }
    }

    span {
        font-size: 2em;
    }
    
    button {
        width: 5rem;
        height: 5rem;
        border-radius: 9999px;
        font-size: 1.125rem;
        transition: all 300ms;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    button:focus {
        outline: none;
        background: #eee;
    }

    button:hover {
        background: #eee;
    }

    .text-section-wrapper {
        padding: 1.25rem;
    }
    
    .text-section-wrapper h2 {
        font-size: 1.5rem; /* 24px */
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .actions-buttons {
        padding-top: 1.25rem;
        display: flex;
        flex-shrink: 1;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        width: 100%;
        color: gray;
        font-weight: 300;
        font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }

    @media screen and (min-width: 768px) {
        .text-section-wrapper {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
        }
    }

</style>