import { Writable, writable } from "svelte/store";

const cache = new Map();

interface SWR {
    dataStore: Writable<Promise<any>>,
    reload: Function
}

export function swr(fetcher: (...args) => any, kind: string, args): SWR {
    let store = writable(new Promise(() => { }));

    if (cache.has(JSON.stringify({ kind, args }))) {
        store.set(Promise.resolve(cache.get(JSON.stringify({ kind, args }))))
        console.log('has')
    }

    const load = async () => {
        const response = await fetcher(...args);
        cache.set(JSON.stringify({ kind, args }), response)
        store.set(Promise.resolve(response));
    }

    load();
    return {
        dataStore: store,
        reload: load
    };
}