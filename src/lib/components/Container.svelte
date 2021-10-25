<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: content-box;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    

    @media screen and (min-width: 768px) {
        .container {
            max-width: 50%;
        }
    }
</style>