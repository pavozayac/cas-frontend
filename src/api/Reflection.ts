import { writable, Writable } from 'svelte/store'
import type { BulkComment } from './Comment'
import { route, hasObject } from './utils'

interface Attachment {
    filename: string,
    id: string,
    saved_path: string,
    date_added: Date,
    reflection_id: number
}

export interface Reflection {
    id: number,
    slug: string,
    title: string
    text_content: string,
    creativity: boolean,
    activity: boolean,
    service: boolean,
    comments: BulkComment[],
    tags: Array<{ name: string }>,
    date_added: Date,
    profile_id: number,
    is_favourite: boolean,
    attachments: Array<Attachment>
}

export interface BulkReflection {
    id: number;
}

export interface ReflectionFilters {
    title?: string,
    creativity?: boolean,
    activity?: boolean,
    service?: boolean,
    profile?: {
        id?: number,
        group_id?: number,
        post_visibility?: number,
        last_online_gte?: Date,
        last_online_lte?: Date,
        date_joined_gte?: Date,
        date_joined_lte?: Date
    }
}

export interface ReflectionSorts {
    title?: 'asc' | 'desc'
    date_added?: 'asc' | 'desc'
}

export async function postReflection(values) {
    console.log('bruh')
    let tags = values.tags.map(tag => { return { 'name': tag } })
    console.log(tags)
    let data = {
        title: values.title,
        text_content: values.text_content,
        creativity: hasObject(values.categories, 'creativity'),
        activity: hasObject(values.categories, 'activity'),
        service: hasObject(values.categories, 'service'),
        tags: tags
    }

    try {
        const res = await fetch(route('reflections'), {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }

        const reflection = await res.json()

        for (const file of values.files) {
            let data = new FormData()
            data.append('file', file)

            const res = await fetch(route(`reflections/${reflection.id}/attachment`), {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: data
            })

            if (res.status != 200) {
                throw 'Upload failed'
            }
        }


    } catch (err) {
        throw err
    }
}

export async function updateReflection(values, reflection_id: number) {
    console.log('bruh')
    let tags = values.tags.map(tag => { return { 'name': tag } })
    console.log(tags)
    let data = {
        title: values.title,
        text_content: values.text_content,
        creativity: hasObject(values.categories, 'creativity'),
        activity: hasObject(values.categories, 'activity'),
        service: hasObject(values.categories, 'service'),
        tags: tags
    }

    try {
        const res = await fetch(route(`reflections/${reflection_id}`), {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }

        const reflection = await res.json()

        for (const file of values.files) {
            let data = new FormData()
            data.append('file', file)

            const res = await fetch(route(`reflections/${reflection.id}/attachment`), {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: data
            })

            if (res.status != 200) {
                throw 'Upload failed'
            }
        }


    } catch (err) {
        throw err
    }
}

export async function filterReflections(sorts: ReflectionSorts, filters: ReflectionFilters): Promise<BulkReflection[]> {
    try {
        const res = await fetch(route('reflections/query'), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                sorts: sorts,
                filters: filters
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

export async function getReflection(id: number): Promise<Reflection> {
    try {
        const res = await fetch(route(`reflections/${id}`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

export async function favouriteReflection(reflection_id: number) {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/favourite`), {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err
    }
}

export async function unfavouriteReflection(reflection_id: number) {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/favourite`), {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }

        return res.json()
    } catch (err) {
        throw err
    }
}

export async function filterFavouriteReflections(): Promise<Reflection[]> {
    try {
        const res = await fetch(route('reflections/favourites'), {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                filters: {},
                sorts: {
                    "date_added": 'desc'
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }

        return res.json()
    } catch (err) {
        throw err
    }
}