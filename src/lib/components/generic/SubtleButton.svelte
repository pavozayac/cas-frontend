<script lang="ts">
    export let target: string
    export let fullIconName: string = ''
    export let text: string
    export let style: string = ''
</script>

<a href={target} style={style}>
    {#if fullIconName}
        <span class="material-icons-round">{fullIconName}</span>
    {/if}
    <span class="text">{text}
</a>

<style>
    a {
        width: 100vw;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        font-family: Rubik, sans-serif; 
        background: transparent; 
        margin-bottom: 1rem;
        border-radius: 9999px;
        cursor: pointer;
        width: auto;
        background: var(--bg-grey);
    }   

    .text {
        /* text-decoration: underline; */
        color: var(--bg-dark-grey);
        font-size: .8rem;
    }

    a:hover {
        background: var(--bg-grey);
    }

    span {
        text-decoration: none;
        font-size: .8rem;
        margin-right: 0.5rem;
    }
    
</style>