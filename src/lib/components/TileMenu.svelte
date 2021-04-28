<script lang="ts">
import { compute_rest_props } from "svelte/internal";


    export let nav = false;

    enum IconType {
        outlined = 'material-icons-outlined',
        round = 'material-icons-round'
    }
    
    interface MenuElement {
        icon: string,
        iconType: IconType,
        name: string
    }

    let menuElements: MenuElement[] = [
        {icon: 'home', iconType: IconType.round, name: 'Homepage'},
        {icon: 'description', iconType: IconType.round, name: 'Reflections'},
        {icon: 'bookmark_added', iconType: IconType.round, name: 'Bookmarks'},
        {icon: 'group', iconType: IconType.round, name: 'Groups'},
        {icon: 'feedback', iconType: IconType.round, name: 'Feedback'},
    ]

</script>

<div class={`grid grid-cols-2 gap-x-2 gap-y-6 w-80 ${!nav && "fixed left-1/12 top-2/12 invisible md:visible"} ${$$props.class}`}>
    {#each menuElements as el}
        <button class="box-content p-5 bg-gray-200 hover:(bg-gray-300 text-blue-500) w-24 h-24 rounded-lg flex flex-col justify-center items-center transition-all duration-300"><i class={el.iconType}>{el.icon}</i>{el.name}</button>
        
    {/each}

</div>

<style lang="postcss">
    i {
        @apply text-4xl font-thin;
    }

    button {
        font-family: Rubik, sans-serif;
        font-display: swap;
    }

</style>