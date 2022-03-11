import { Pagination, route } from './utils'
import { profileStore } from 'stores/profile'
import type { GroupSorts } from './Groups';

interface Avatar {
    filename: string,
    id: string,
    saved_path: string,
    date_added: Date
}

export interface BulkProfile {
    id: number;
}

export interface Profile {
    first_name: string,
    last_name: string,
    post_visibility: number,
    is_admin: boolean,
    id: number,
    group_id: string,
    date_joined: Date,
    avatar: Avatar;
    reflections_count: number;
}

interface ProfileSorts {
    date_joined?: 'asc' | 'desc';
    post_visibility?: 'asc' | 'desc';
    last_online?: 'asc' | 'desc';
    first_name?: 'asc' | 'desc';
    group?: GroupSorts;
}

interface ProfileFilters {
    id?: number;
    group_id?: string;
    post_visibility?: number;
    last_online_gte?: Date;
    last_online_lte?: Date;
    date_joined_gte?: Date;
    date_joined_lte?: Date;
    full_text_con?: string;
}

interface FilterBody {
    sorts: ProfileSorts;
    filters: ProfileFilters;
    pagination: Pagination;
}

export async function currentProfile(): Promise<Profile> {
    try {
        const res = await fetch(route('profiles/current'), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        const response = await res.json()
        console.log('Res')
        console.log(response)
        profileStore.set(response)
        return response
    } catch (err) {
        profileStore.set(null)
        throw err
    }
}


export async function filterProfiles(body: FilterBody): Promise<[BulkProfile[], number]> {
    try {
        const res = await fetch(route(`profiles/query`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (res.status != 200) {
            throw await res.text()
        }
        const resBody = await res.json();
        return [resBody.items, resBody.count];
        
    } catch (err) {
        throw err
    }
}


export async function getProfile(profile_id: number): Promise<Profile> {
    try {
        const res = await fetch(route(`profiles/${profile_id}`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err;
    }
}

export async function updateProfile(values): Promise<void> {
    try {
        const res = await fetch(route('profiles/current'), {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(values),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err
    }
}

export async function deleteProfile(profile_id: number): Promise<Profile> {
    try {
        const res = await fetch(route(`profiles/${profile_id}`), {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err;
    }
}


export async function updateProfileAvatar(values): Promise<void> {
    let file: File = values.file
    let data = new FormData()
    data.append('file', file)

    try {
        const res = await fetch(route('profiles/avatar'), {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: data
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err
    }
}

export async function leaveGroup() {
    try {
        const res = await fetch(route(`profiles/current/leave-group`), {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();
    } catch (err) {
        throw err
    }
} 