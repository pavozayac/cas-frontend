<script lang="ts">
    import { onMount, SvelteComponent } from "svelte";

    export let props: Record<string, any>;
    export let promise: Function;

    let Component;

    onMount(async () => {
        Component = (await promise()).default;
    });
</script>

<svelte:component this={Component} {...props} />
