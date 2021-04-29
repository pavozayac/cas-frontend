import { Writable, writable } from 'svelte/store'

export const tilesVisible: Writable<boolean> = writable(false)