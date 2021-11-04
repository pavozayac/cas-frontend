import { Writable, writable } from 'svelte/store'

export const profileStore: Writable<any> = writable(JSON.parse(localStorage.getItem('profileStore')))

profileStore.subscribe(value=> {
    localStorage.setItem('profileStore', JSON.stringify(value))
})
