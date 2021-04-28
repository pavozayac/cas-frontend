<script lang="ts">
    import { fly } from 'svelte/transition'
    import Svg from 'svelte-inline-svg'
    import LogoMat from '../graphics/LogoMat.svelte'

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

<div on:click transition:fly={{duration: 300, x: -200}} class="fixed w-full h-full left-0 top-0">
    <div on:click={e=>e.stopPropagation()} class="w-70 h-full flex flex-col items-center bg-white">
        <LogoMat class="w-50" />
        <!--<Svg class="w-50" src="/graphics/logo_mat.svg"/>-->
        <ol class="list-none w-full">
        {#each menuElements as e}
            <a href="/"><li class="flex p-5 w-full hover:bg-gray-200"><span class={e.iconType}>{e.icon}</span>{e.name}</li></a>
        {/each}
        </ol>
    </div>
</div>

<style>
    li {
        font-family: Rubik, sans-serif;
    }

    span {
        @apply mr-5;
    }
</style>