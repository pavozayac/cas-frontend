<script lang="ts">
    import type { Reflection } from "api/Reflection";
    import {
        favouriteReflection,
        getReflection,
        unfavouriteReflection,
    } from "api/Reflection";
    import { swr } from "api/swr";
    import { cubicInOut } from "svelte/easing";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";
    import Container from "../Container.svelte";
    import Loading from "../generic/Loading.svelte";
    import ProfileButton from "../generic/ProfileButton.svelte";
    import AddCommentBox from "./comments/AddCommentBox.svelte";
    import Comment from "./comments/Comment.svelte";
    import { queryComments } from "api/Comment";
    import CommentSection from "./comments/CommentSection.svelte";
    import Carousel from "lib/components/reflections/Carousel.svelte";
    import { attachmentSrc } from "api/utils";
    import { currentProfile } from "api/Profile";

    export let id;

    // let bookmarked: boolean = false

    const commentsVisible: Writable<boolean> = writable(false);

    // const date = new Date();

    // $: day = date.getDate();
    // $: date.setMonth(date.getMonth());
    // $: month = date.toLocaleString("en-us", { month: "long" });
    // $: year = date.getFullYear();
    // $: time = date.toLocaleTimeString("en-uk", { timeStyle: "short" });

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

    const [dataStore, reload] = swr(getReflection, "reflection", [id]);

    const [profileStore, profileReload] = swr(
        currentProfile,
        "currentProfile",
        []
    );

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
                {new Date(reflection.date_added).getDate()}.{new Date(
                    reflection.date_added
                ).getMonth()}.{new Date(reflection.date_added).getFullYear()}
            </div>
            <div class="categories">
                {#if reflection.creativity}
                    <div class="category creativity">Creativity</div>
                {/if}
                {#if reflection.activity}
                    <div class="category activity">Activity</div>
                {/if}
                {#if reflection.service}
                    <div class="category service">Service</div>
                {/if}
            </div>
            <ProfileButton id={reflection.profile_id} />
        </div>

        <div class="carousel-wrapper">
            <Carousel
                urls={reflection.attachments.map((attachment) =>
                    attachmentSrc(reflection, attachment)
                )}
            />
        </div>
        <div class="text-section-wrapper">
            <h2>
                {reflection.title}
            </h2>
            <p>
                {reflection.text_content}
            </p>
            <div class="tags">
                {#each reflection.tags.slice(0, 5) as tag}
                    <div class="tag">#{tag.name}</div>
                {/each}
            </div>
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
                <button
                    on:click={() => {
                        $commentsVisible = !$commentsVisible;
                        console.log($commentsVisible);
                    }}
                >
                    <span class="material-icons-outlined">comment</span> Comments
                </button>
                {#await $profileStore then profile}
                    {#if profile.id == reflection.profile_id}
                        <a
                            class="edit-button"
                            href={`/reflection/${reflection.id}/edit`}
                        >
                            <span class="material-icons-outlined">edit</span> Edit
                        </a>
                    {/if}
                {/await}
            </div>
        </div>
        <CommentSection {commentsVisible} reflection_id={reflection.id} />
    </div>
{:catch error}
    Error
{/await}

<style lang="postcss">
    .tags {
        width: 100%;
        display: flex;
    }

    .tag {
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        background: var(--accent-green);
        margin-right: 0.5rem;
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
        /* margin-top: 1.25rem; */
        margin-bottom: 1.25rem;
    }

    span {
        font-size: 1em;
        margin-right: 1rem;
    }

    button,
    .edit-button {
        appearance: none;
        text-decoration: none;
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
        margin: 0.5rem;
    }

    .edit-button {
    }

    .bookmarked {
        background: white;
        color: var(--accent-blue);
        outline: 2px solid var(--accent-blue);
    }

    button:hover {
        filter: brightness(0.9);
    }

    .edit-button:hover {
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
        padding-top: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        width: 100%;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
    }

    .categories {
        display: flex;
        justify-content: flex-start;
        width: 50%;
    }

    .category {
        border-radius: 9999px;
        padding: 0.1rem 0.5rem;
    }

    .creativity {
        border: 2px solid var(--accent-blue);
    }

    .activity {
        border: 2px solid var(--accent-red);
    }

    .service {
        border: 2px solid var(--accent-green);
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
