import { Writable, writable } from 'svelte/store'
import type { Profile } from 'api/Profile'

export const profileStore: Writable<Profile> = writable(JSON.parse(localStorage.getItem('profileStore')))

profileStore.subscribe(value=> {
    localStorage.setItem('profileStore', JSON.stringify(value))
})
