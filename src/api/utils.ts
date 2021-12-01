import type { Writable } from "svelte/store";

export const backendUrl = 'http://localhost:8000/'

export function readStore<T>(store: Writable<T>): T {
    let value;
    
    const unsubscribe = store.subscribe(val => value = val);

    return value;
}

export function route(route: string): string {
    return `${backendUrl}${route}`
}

export function avatarSrc(avatar): string {
    return `${backendUrl}profiles/avatar/${avatar.id}`
}

export function attachmentSrc(reflection, attachment){
    return `${backendUrl}reflections/${reflection.id}/attachment/${attachment.id}`
}

export function groupAvatarSrc(avatar){
    return `${backendUrl}groups/avatar/${avatar.id}`
}

export function remove(array, value){
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            array = array.splice(i+1, 1)
        }
    }
    return array
}

export function hasObject(array, value){
    let result = false
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            result = true
            break
        }
    }
    return result
}