<script lang="ts">
    import { fly } from 'svelte/transition'
    import Svg from 'svelte-inline-svg'
    import LogoMat from '../graphics/LogoMat.svelte'
    import { tilesVisible } from '../../stores/nav'

    let div: HTMLElement;

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

    function touch (node: Node) {
        let startX, endX;

        function handleTouchStart (e: TouchEvent) {
            startX = e.touches[0].clientX;
            node.addEventListener('touchmove', handleTouchMove)
            node.addEventListener('touchend', handleTouchEnd);

            console.log('startx:', startX);
        }

        function handleTouchMove (e:TouchEvent) {
            console.log('moving')
            let diff = startX - e.changedTouches[0].clientX;
            if (diff > 0 && diff <= 200)
                div.style.left = `${-diff*0.5}%`;
        }


        function handleTouchEnd (e: TouchEvent) {
            endX = e.changedTouches[0].clientX;
            console.log('endx:', endX);

            if (startX - endX > 100){
                console.log('bruhbruh')
                $tilesVisible = false;
            } else {
                div.animate({
                    left: 0,
                }, {duration: 100}).onfinish = () =>  div.style.left = "0";

            }
            node.removeEventListener('touchmove', handleTouchMove)
            node.removeEventListener('touchend', handleTouchEnd);
        }

        node.addEventListener('touchstart', handleTouchStart);

        return {
            destroy() {
                node.removeEventListener('touchstart', handleTouchStart);
                node.removeEventListener('touchmove', handleTouchMove);
                node.removeEventListener('touchend', handleTouchEnd);
            }
        }

    }

</script>

<div bind:this={div} use:touch on:scroll={e=>e.stopPropagation()} on:click transition:fly={{duration: 300, x: -200}} class="fixed w-full h-full left-0 top-0">
    <div on:click={e=>e.stopPropagation()} class="shadow-lg w-70 rounded-r-lg h-full flex flex-col items-center bg-white">
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