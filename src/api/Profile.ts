import { route } from './utils'
import { profileStore } from 'stores/profile'

interface Avatar {
    filename: string,
    id: string,
    saved_path: string,
    date_added: Date
}

export interface Profile {
    first_name: string,
    last_name: string,
    post_visibility: number,
    id: number,
    group_id: number,
    date_joined: Date,
    avatar: Avatar
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

export async function getProfile(profile_id: number): Promise<Profile> {
    try {
        const res = await fetch(route(`profiles/id/${profile_id}`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err
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