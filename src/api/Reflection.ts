import { writable, Writable } from 'svelte/store'
import type { BulkComment } from './Comment'
import { route, hasObject, Pagination } from './utils'

interface Attachment {
    filename: string,
    id: string,
    saved_path: string,
    date_added: string,
    reflection_id: number
}

export interface Reflection {
    id: number,
    slug: string,
    title: string
    text_content: string,
    post_visibility: number,
    creativity: boolean,
    activity: boolean,
    service: boolean,
    comments: BulkComment[],
    tags: Array<{ name: string }>,
    date_added: string,
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
    date_added_gte?: string,
    date_added_lte?: string,
    post_visibility?: number,
    profile?: {
        id?: number,
        group_id?: string,
        post_visibility?: number,
        last_online_gte?: string,
        last_online_lte?: string,
        date_joined_gte?: string,
        date_joined_lte?: string
    }
}

export interface ReflectionSorts {
    title?: 'asc' | 'desc'
    date_added?: 'asc' | 'desc'
}

export async function postReflection(values) {
    // console.log('bruh')
    let tags = values.tags.map(tag => { return { 'name': tag } })
    // console.log(tags)
    let data = {
        title: values.title,
        text_content: values.text_content,
        post_visibility: values.post_visibility,
        creativity: values.creativity,
        activity: values.activity,
        service: values.service,
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
    // console.log('bruh')
    let tags = values.tags.map(tag => { return { 'name': tag } })
    // console.log(tags)
    let data = {
        title: values.title,
        text_content: values.text_content,
        post_visibility: values.post_visibility,
        creativity: values.creativity,
        activity: values.activity,
        service: values.service,
        tags: tags
    }

    for (const uuid of values.delete_uuids) {
        try {
            const res = await fetch(route(`reflections/${reflection_id}/attachment/${uuid}`), {
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors',
            })

            if (res.status != 200) {
                throw 'Current profile unavailable'
            }
        } catch (err) {
            throw err
        }
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

export interface FilterBody {
    sorts?: ReflectionSorts;
    filters?: ReflectionFilters;
    pagination?: Pagination;
}

export async function filterReflections(request: FilterBody): Promise<[BulkReflection[], number]> {
    const filterRoute = route('reflections/query');

    try {
        const res = await fetch(filterRoute, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }
        const body = await res.json();

        return [body.items, body.count];
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

export async function deleteReflection(reflection_id: number) {
    try {
        const res = await fetch(route(`reflections/${reflection_id}`), {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        });

        if (res.status != 200) {
            throw await res.text();
        }

        return res.json()
    } catch (err) {
        throw err;
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

export async function filterFavouriteReflections(reqBody): Promise<[Reflection[], number]> {
    try {
        const res = await fetch(route('reflections/favourites'), {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }
        
        const resBody = await res.json();
        return [resBody.items, resBody.count];
    } catch (err) {
        throw err
    }
}