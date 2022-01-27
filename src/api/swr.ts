import { Writable, writable } from "svelte/store";

const cache = new Map();

type SWR<C> = [Writable<Promise<C>>, Function];

type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;


export function swr<F extends (...args: any[]) => Promise<any>>(fetcher: F, kind: string, args: Parameters<F>, refresh = true): SWR<ReturnPromiseType<F>> {
    let store: Writable<Promise<ReturnPromiseType<F>>> = writable(new Promise(() => { }));

    if (cache.has(JSON.stringify({ kind, args }))) {
        store.set(Promise.resolve(cache.get(JSON.stringify({ kind, args }))[0]))
    }

    const load = async (load_args?) => {
        if (load_args){
            try {
                const response = await fetcher(...load_args);
                cache.set(JSON.stringify({ kind, load_args }), [response, (new Date()).getTime()]);
                store.set(Promise.resolve(response));
            } catch (err) {
                store.set(Promise.reject(err));
            }
        } else {
            try {
                const response = await fetcher(...args);
                cache.set(JSON.stringify({ kind, args }), [response, (new Date()).getTime()]);
                store.set(Promise.resolve(response));
            } catch (err) {
                store.set(Promise.reject(err));
            }
        }
    }

   
    
    if (refresh || !cache.has(JSON.stringify({ kind, args })) ||  (new Date()).getTime() - cache.get(JSON.stringify({ kind, args }))[1] > 1000 * 60 * 2){
        try {
            load();
        } catch (err) {
            throw err;
        }
    }

    return [store, load];
}