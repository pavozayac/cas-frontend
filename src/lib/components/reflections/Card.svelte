<script lang="ts">
    import type { Reflection } from "api/Reflection";
    import {
        favouriteReflection,
        getReflection,
        unfavouriteReflection,
    } from "api/Reflection";
    import { swr } from "api/swr";
    import { cubicInOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import Container from "../Container.svelte";
    import Loading from "../generic/Loading.svelte";
    import ProfileButton from "../generic/ProfileButton.svelte";
    import AddCommentBox from "./comments/AddCommentBox.svelte";
    import Comment from "./comments/Comment.svelte";

    export let id;

    // let bookmarked: boolean = false

    let commentsVisible: boolean = false;

    const date = new Date();

    $: day = date.getDate();
    $: date.setMonth(date.getMonth());
    $: month = date.toLocaleString("en-us", { month: "long" });
    $: year = date.getFullYear();
    $: time = date.toLocaleTimeString("en-uk", { timeStyle: "short" });

    let mock_comments = [
        {
            profile: {
                nickname: "Bruh",
                profileImage: "https://placekitten.com/400/400",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            profile: {
                nickname: "Bruh",
                profileImage: "https://placekitten.com/400/400",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            profile: {
                nickname: "Bruh",
                profileImage: "https://placekitten.com/400/400",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            profile: {
                nickname: "Bruh",
                profileImage: "https://placekitten.com/400/400",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];

    function commentsIn(node, { delay = 0, duration = 300 }) {
        return {
            delay,
            duration,
            css: (t) => {
                const eased = cubicInOut(t);
                return `
                    transform: scaleY(${eased});
                `;
            },
        };
    }

    // let bookmarked: boolean;

    let [dataStore, reload] = swr<Reflection>(getReflection, "reflection", [
        id,
    ]);

    // let bookmarked = writable(null);

    // async function loadBookmark () {
    //     $bookmarked = (await $dataStore).is_favourite;
    //     return;
    // }

    // dataStore.subscribe(prom => {
    //     prom.then(ref => $bookmarked = ref.is_favourite);
    // });

    // afterUpdate(()=>{
    //     $dataStore.then(res=>{
    //         bookmarked = res.is_favourite;
    //     })
    // })

    async function toggleReflection(reflection: Reflection) {
        if (reflection.is_favourite) {
            await unfavouriteReflection(reflection.id);
        } else {
            await favouriteReflection(reflection.id);
        }
        reload();
    }

    // onMount(async () => {
    //     bookmarked.subscribe(async value => {
    //         toggleReflection((await $dataStore), value);
    //     })
    // });
</script>

<!-- {@debug bookmarked} -->

{#await $dataStore}
    <Container>
        <Loading />
    </Container>
{:then reflection}
    <div class="card-container">
        <div class="top-widgets">
            <div class="date">
                {reflection.date_added}
            </div>
            <div class="categories" />
            <ProfileButton id={reflection.profile_id} />
        </div>

        <div class="carousel-wrapper">
            <!-- <Carousel
                urls={reflection.attachments.map((attachment) =>
                    attachmentSrc(reflection, attachment)
                )}
            /> -->
        </div>
        <div class="text-section-wrapper">
            <h2>
                {reflection.title}
            </h2>
            <p>
                {reflection.text_content}
            </p>
            <div class="actions-buttons">
                <button
                    class:bookmarked={reflection.is_favourite}
                    on:click={() => {
                        toggleReflection(reflection);
                    }}
                >
                    <span class="material-icons-outlined"
                        >{reflection.is_favourite
                            ? "done"
                            : "bookmark_border"}</span
                    >
                    {reflection.is_favourite ? "Bookmarked" : "Bookmark"}
                </button>
                <button on:click={() => (commentsVisible = !commentsVisible)}>
                    <span class="material-icons-outlined">comment</span> Comments
                </button>
            </div>
        </div>
        {#if commentsVisible}
            <div class="comment-section" transition:slide>
                <div class="comments-wrapper">
                    <AddCommentBox />
                    {#each mock_comments as comment}
                        <Comment {comment} />
                    {/each}
                </div>
                <button
                    class="close-button"
                    on:click={() => (commentsVisible = false)}
                >
                    <span class="material-icons-outlined">close</span> Close
                </button>
            </div>
        {/if}
    </div>
{:catch error}
    Error
{/await}

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
        filter: brightness(0.9);
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
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
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
