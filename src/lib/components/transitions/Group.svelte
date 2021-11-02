<script lang="ts">
    import { getContext, setContext } from "svelte"

    const key = {}  

    setContext(key, { 
        index: 0,
        incrementIndex(){
            let index: number = getContext(key)
            setContext(key, index + 1)
        },
        decrementIndex(){
            let index: number = getContext(key)
            setContext(key, index - 1)
        },
        setIndex(newIndex: number){
            setContext(key, newIndex)
        }
    })

</script>


<slot {key}></slot>