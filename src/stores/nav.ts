import { Writable, writable } from 'svelte/store'

export const tilesVisible: Writable<boolean> = writable(false)
export const menuVisible: Writable<boolean> = writable(false)
export const authorized: Writable<boolean> = writable(false)
export const scrollStore: Writable<number> = writable(document.body.scrollTop)