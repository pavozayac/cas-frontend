<script lang="ts">
    import App from 'App.svelte'
    import type { is_promise } from 'svelte/internal';
    import Carousel from './Carousel.svelte'
    import { cubicInOut } from 'svelte/easing'
    import { slide } from 'svelte/transition'

    let bookmarked: boolean = false

    let commentsVisible: boolean = false

    const date = new Date()

    $: day = date.getDate()
    $: date.setMonth(date.getMonth())
    $: month = date.toLocaleString('en-us', {month: "long"})
    $: year = date.getFullYear()
    $: time = date.toLocaleTimeString('en-uk', {timeStyle: 'short'})

    let pics_urls = [
        'https://placekitten.com/1280/720',
        'https://placekitten.com/1920/1080',
        'https://placekitten.com/1366/768',
        'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg',
    ]

    let mock_comments = [
        {
            profile: {
                nickname: 'Bruh',
                profileImage: 'https://placekitten.com/400/400'
            },
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            profile: {
                nickname: 'Bruh',
                profileImage: 'https://placekitten.com/400/400'
            },
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            profile: {
                nickname: 'Bruh',
                profileImage: 'https://placekitten.com/400/400'
            },
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            profile: {
                nickname: 'Bruh',
                profileImage: 'https://placekitten.com/400/400'
            },
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ]

    function commentsIn (node, { delay = 0, duration = 300}) {
        return {
            delay,
            duration,
            css: t => {
                const eased = cubicInOut(t)
                return `
                    transform: scaleY(${eased});
                `
            }
        }
    }
</script>

<div class="card-container">
    <div class="top-widgets">
        <div class="date">
            {day} {month} {year} {time}
        </div>
        <div class="categories">

        </div>
        <div class="profile-info">
            <span class="profile-name">Profile Name</span>
            <img alt="Profile picture" class="profile-icon" src={pics_urls[0]} />
        </div>
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
            <button class:bookmarked on:click={()=>bookmarked = !bookmarked}>
                <span class="material-icons-outlined">{bookmarked ? 'done' : 'bookmark_border'}</span> {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button on:click={()=>commentsVisible = !commentsVisible}>
                <span class="material-icons-outlined">comment</span> Comments
            </button>
        </div>
    </div>
    {#if commentsVisible}
    <div class="comment-section" transition:slide>
        <div class="comments-wrapper">
            <div class="add-comment">
                <form class="add-comment-form">
                    <input class="add-comment-input" type="text" placeholder="Add your comment"/>
                    <input class="add-comment-button" type="submit" value="Post" />
                </form>
            </div>
            {#each mock_comments as comment}
                <div class="comment">
                    <div class="comment-profile">
                        <img alt="Commenter profile image" class="comment-profile-image" src={comment.profile.profileImage} />
                    </div>
                    <p class="comment-text">{comment.text}</p>
                </div>
            {/each}
        </div>
        <button class="close-button" on:click={()=>commentsVisible=false}>
            <span class="material-icons-outlined">close</span> Close
        </button>
    </div>
    {/if}
</div>

<style lang="postcss">
    .comment-section {
        background: var(--bg-grey);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        transition: all;
    }

    .comments-wrapper {
        width: 100%;
    }

    .close-button {
        margin: 0;
        outline: 2px solid var(--accent-blue);
        background: inherit;
        color: var(--accent-blue);
    }

    .comment {
        background: var(--bg-grey-lower);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .comment-profile-image {
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        object-fit: cover;
    }

    .comment-text {
        margin-left: 2rem;
    }

    .add-comment-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .add-comment-input {
        width: 100%;
        margin-right: 1rem;
        outline: none;
        border: 2px solid var(--bg-grey-lower);
        box-sizing: border-box;
        border-radius: 1rem;
        padding: 1rem;
        background: var(--bg-grey);
    }

    input::placeholder {
        font-family: Rubik, sans-serif;
    }

    .add-comment-button {
        font-family: Rubik, sans-serif;
        outline: none;
        border: none;
        padding: 1rem;
        background: var(--accent-blue);
        border-radius: 1rem;
        height: 100%;
        color: white;
    }

    .top-widgets {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        font-family: Rubik, sans-serif;
        font-size: 1rem;
    }

    .date {
        color: var(--bg-darker-grey);
    }

    .profile-info {
        display: flex;
        align-items: center;
        padding: 0.4rem 1rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: all 200ms;
    }

    .profile-info:hover {
        background: var(--bg-grey);
    }

    .profile-icon {
        border-radius: 9999px;
        width: 3rem;
        height: 3rem;
        object-fit: cover;
    }

    .profile-name {
        font-size: 1rem;
        font-weight: 400;
        margin-right: 1rem;
    }

    .card-container {
        background-color: white;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        overflow: hidden;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
    }

    span {
        font-size: 1em;
        margin-right: 1rem;
    }
    
    button {
        background: var(--accent-blue);
        color: white;
        width: 100%;
        height: 3rem;
        border-radius: 1rem;
        font-size: 1.125rem;
        transition: background-color color 300ms;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: Rubik, sans-serif;
        margin: 1rem;
    }

    .bookmarked {
        background: white;
        color: var(--accent-blue);
        outline: 2px solid var(--accent-blue);
    }

    button:hover {
        filter: brightness(.9);
    }

    .text-section-wrapper {
        padding: 1.25rem;
        border-radius: 10rem;
    }
    
    .text-section-wrapper h2 {
        font-size: 1.5rem; /* 24px */
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .actions-buttons {
        padding-top: 1.25rem;
        display: flex;
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

        .card-container {
            width: 40rem;
        }
    }

</style>