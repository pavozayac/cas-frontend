<script lang="ts">
    import { pageLimit } from "lib/constants";

    import type { Writable } from "svelte/store";
import LeftCenterRightFlex from "./LeftCenterRightFlex.svelte";

    export let args: Writable<Record<any, any>>;
    export let count: number;
    export let pageStore: Writable<number>;
    export let reload: Function;
    export let extraArguments = [];

    // currentPage.subscribe(value => {
    //     reload([...args, {
    //         limit: pageLimit,
    //         offset: currentPage,
    //     }])
    // })

    function next() {
        console.log($pageStore)
        console.log('count', count, (count / pageLimit) - 1)
        if ($pageStore < ((count / pageLimit) - 1)) {
            console.log('pass   ')
            $pageStore = $pageStore + 1;

            reload([
                ...extraArguments,
                {
                    ...$args,
                    pagination: {
                        limit: pageLimit,
                        page: $pageStore,
                    },
                }
            ]);
        }
    }

    function previous() {
        console.log($pageStore)

        if ($pageStore > 0) {
            $pageStore = $pageStore - 1;

            reload([
                ...extraArguments,
                {
                    ...$args,
                    pagination: {
                        limit: pageLimit,
                        page: $pageStore,
                    },
                }
            ]);
        }
    }
</script>

<LeftCenterRightFlex style="margin-bottom: 1rem;">
    <div slot="left" class="button-container left">
        {#if $pageStore > 0}
            <button on:click={previous}>
                <span class="material-icons-round">chevron_left</span>
            </button>
        {/if}
    </div>

    <div slot="center" class="indicator-wrapper">
        <div class="indicator">
            {$pageStore + 1}
        </div> 
        <div class="of">of {Math.ceil(count / pageLimit)}</div>
    </div>

    <div slot="right" class="button-container right">
        {#if $pageStore < (count / pageLimit) - 1}
        <button on:click={next}>
            <span class="material-icons-round">chevron_right</span>
        </button>
        {/if}
    </div>
</LeftCenterRightFlex>
<style>
    .button-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: Rubik, sans-serif;
    }
    .left {
        justify-content: flex-end;
    }

    .right {
        justify-content: flex-start;
    }

    .indicator-wrapper {
        display: flex;
        align-items: center;
        font-family: Rubik, sans-serif;
    }

    .indicator {
        font-family: Rubik, sans-serif;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        outline: 2px solid var(--accent-blue);
        margin-left: 1rem;
        margin-right: .5rem;
    }

    .of {
        margin-right: 1rem;
    }

    button {
        background: var(--accent-blue);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        padding: .5rem;
        cursor: pointer;
        width: 5rem;
    }
</style>