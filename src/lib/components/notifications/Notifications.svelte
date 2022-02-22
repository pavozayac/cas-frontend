<script lang="ts">

    let notes = [
        "Something something.",
        "A lot of notifications incoming.",
        "Do a barrel roll!",
    ]

</script>

<div class="notifications-container">
    <h1 style="font-size: 1.5rem;">Recent notifications</h1>

    {#each notes as note, index}
        <div class:first={index == 0} class="notification">
            <div class="dismiss">
                Click to dismiss
            </div>
            <div class="text">
                {note}
            </div>
        </div>
    {/each}

</div>

<style>
    h1 {
        padding: 1rem;
    }

    .first {
        border-top: none;
    }

    .notifications-container {
        background: var(--bg-grey-lower);
        top: 50%;
        transform: translateY(-50%);
        left: calc(50% + 22rem);
        position: fixed;
        /* padding: 1rem; */
        border-radius: 1rem;
        font-family: Rubik, sans-serif;
        overflow: hidden;
        user-select: none;
    }

    .text {
        padding: 1rem;
    }

    .notification {
        position: relative;
        overflow: hidden;
        /* border-radius: 1rem; */
    }

    .notification::before {
        content: "";
        position: absolute;
        width: 90%;
        margin-left: 5%;
        height: 100%;
        border-top: 1px solid black;
    }

    .dismiss {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        opacity: 0;
        color: white;
    }

    .dismiss:hover {
        opacity: .7;
        background: black;
    }



</style>