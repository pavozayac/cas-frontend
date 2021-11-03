<script lang="ts">
    export let navMargin = true
</script>

<div class="container" class:navMargin>
    <slot></slot>
</div>

<style>
    .container {
        width: 1000px;
        height: auto;
        /* display: flex; */
        /* overflow: visible; */
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        /* box-sizing: content-box; */
        /* margin-top: 0.5rem; */
        /* margin-bottom: 0.5rem; */
    }

    .navMargin {
        margin-top: 5rem;
    }
    

    @media screen and (min-width: 768px) {
        .container {
            max-width: 50%;
        }
    }
</style>