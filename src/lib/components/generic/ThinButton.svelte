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
    <span class="text">{text}</span>
</a>

<style>
    a {
        width: fit-content; 
        display: flex;
        align-items: center;
        padding: 0.5rem;
        font-family: Rubik, sans-serif; 
        background: transparent; 
        margin-bottom: 1rem;
        border-radius: 9999px;
        cursor: pointer;
        width: auto;
    }   

    a:hover {
        background: var(--bg-grey-lower);
    }

    span {
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }

    .text {
        font-size: .9rem;
    }
    
</style>