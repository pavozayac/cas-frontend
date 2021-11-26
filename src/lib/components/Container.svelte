<script lang="ts">
    export let navMargin = true
    export let padding = false
    export let thin = false
</script>

<div class="container" class:thin class:navMargin class:padding>
    <slot></slot>
</div>

<style>
    .container {
        width: 80%;
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

    .padding {
        padding: 2rem;
    }
    

    @media screen and (min-width: 768px) {
        .container {
            max-width: 50%;
        }

        .thin {
            max-width: 30%;
        }
    }
</style>