import { Writable, writable } from "svelte/store";

const cache = new Map();

type SWR<C> = [Writable<Promise<C>>, Function];

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;


export function swr<F extends (...args: any[]) => Promise<any>>(fetcher: F, kind: string, args: Parameters<F>): SWR<ReturnPromiseType<F>> {
    let store: Writable<Promise<ReturnPromiseType<F>>> = writable(new Promise(() => { }));

    if (cache.has(JSON.stringify({ kind, args }))) {
        store.set(Promise.resolve(cache.get(JSON.stringify({ kind, args }))))
        // console.log('has')
    }

    const load = async () => {
        const response = await fetcher(...args);
        cache.set(JSON.stringify({ kind, args }), response)
        store.set(Promise.resolve(response));
    }

    load();
    return [store, load];
}