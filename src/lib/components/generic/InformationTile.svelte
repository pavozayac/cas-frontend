<script lang="ts">
    export let label: string;
    export let iconName: string
</script>

<div class="tile">
    <div class="icon-section">
        <span class="material-icons-round icon">{iconName}</span>
    </div>
    <div class="info-section">
        <span class="label">{label}</span>
        <span class="info"><slot></slot></span>
    </div>
</div>

<style>
    .tile {
        width: 100%;
        padding: 1rem 2rem;
        border-radius: .5rem;
        box-sizing: border-box;
        background: var(--bg-light);
        display: flex;
        flex-direction: row;
    }

    .icon-section {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: cete;
    }

    .icon {
        font-size: 2rem;
        width: 3rem;
    }

    .info-section {
        width: 100%;
        font-size: 1.2rem;
        /* text-align: center; */
        /* color: var(--bg-dark-grey);  */
        font-family: Rubik, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .label {
        font-weight: 400;
        /* height: 1rem; */
        width: 100%;
        text-align: left;
        font-size: .9rem;
    }

    .info {
        font-weight: 500;
        padding: 1rem 0;
        width: 100%;
        text-align: left;
    }
</style>