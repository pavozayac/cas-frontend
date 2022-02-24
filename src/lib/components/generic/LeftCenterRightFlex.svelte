<script lang="ts">
    export let style: string = "";
</script>

<div class="wrapper" {style}>
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="center">
        <slot name="center"></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .left {
        flex: 1;
    }

    .right {
        flex: 1;
    }
</style>