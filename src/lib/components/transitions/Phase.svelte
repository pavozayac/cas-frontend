<script lang="ts">
import { getContext } from "svelte";

    export let key: string
    export let index: number

    let currentIndex = getContext(key)

</script>

{#if currentIndex == index}
    <slot {key}></slot>
{/if}

