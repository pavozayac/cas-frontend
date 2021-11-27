import { Writable, writable } from "svelte/store";

const cache = new Map();

type SWR<C> = [Writable<Promise<C>>, Function];

export function swr<T>(fetcher: (...fetcherArgs) => Promise<T>, kind: string, args): [Writable<Promise<T>>, Function] {
    let store: Writable<Promise<T>> = writable(new Promise(() => { }));

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