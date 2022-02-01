import { Writable, writable } from "svelte/store";

export const announcerMemory: Writable<string[]> = writable(new Array());
export const currentNotifications: Writable<string[]> = writable(new Array());

export function announce(message: string) {
    announcerMemory.update(v => [...v, message]);
    currentNotifications.update(v => [...v, message]);
}