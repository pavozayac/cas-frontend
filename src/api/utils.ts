import type { Writable } from "svelte/store";

export const backendUrl = 'http://api.ibcas.pl/'

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

export function remove(array: any[], value){
    let copy = array;
    for (let i = 0; i < copy.length; i++){
        if (copy[i] == value){ 
            copy.splice(copy.indexOf(value), 1);
        }
    }
    return copy;
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

export function transformDate(date: string) {
    return `${new Date(date).getDate()} ${new Date(date).toLocaleString('en-us', { month: 'short' })} ${new Date(date).getFullYear()}`
}

export interface Pagination {
    limit: number;
    page: number;
}

export function filterChange (e: Event, value, args: Writable<Record<string, any>>, pageStore: Writable<number>, reload: Function) {
    if (e.target.checked) {
        args.update(argsValue => {
            let filters = argsValue.filters;
            return  { 
                ...argsValue,
                filters: {
                    ...filters,
                    ...value
                }
            }
        })
        
    } else {
        args.update(argsValue => {
            let filters = argsValue.filters;
            let key = Object.keys(value)[0];
            console.log('key', key)
            delete filters[key];
    
            return { 
                ...argsValue,
                filters: {
                    ...filters,
                }
            }

        })
    }
    pageStore.set(0);

    const unsub = args.subscribe(argsValue => {
        reload([argsValue]);
    });
    unsub();
}

export function sortChange (value, args: Writable<Record<string, any>>, pageStore: Writable<number>, reload: Function) {
    args.update(argsValue => {
        return {
            ...argsValue,
            sorts: value
        }
    })
    
    pageStore.set(0);

    const unsub = args.subscribe(argsValue => {
        reload([argsValue]);
    });
    unsub();
}