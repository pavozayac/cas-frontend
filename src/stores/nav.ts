import { Writable, writable } from 'svelte/store'

export const tilesVisible: Writable<boolean> = writable(false)
export const menuVisible: Writable<boolean> = writable(false)
export const authorized: Writable<boolean> = writable(false)