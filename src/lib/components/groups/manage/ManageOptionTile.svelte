<script lang="ts">
    export let target: string
    export let text: string
    export let icon: string
</script>

<a href={target} class="wrapper">
    <div class="icon-wrapper">
        <span class="material-icons-round">{icon}</span>
    </div>
    <div class="text-wrapper">
        {text}
    </div>
</a>

<style>
    a {
        font-family: Rubik, sans-serif;
        font-display: swap;
        color: #444;
        outline: none;
        text-decoration: none;
    }

    a {
        background: var(--bg-grey-lower);
        border-radius: 1rem;
        overflow: hidden;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all 300ms;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
    }

    a:hover {
        filter: brightness(0.9);
        color: var(--accent-blue);
    }

    span {
        font-size: 3rem;
        padding: 1rem;
        font-weight: 200;
    }
</style>