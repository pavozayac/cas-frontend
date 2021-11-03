import { route } from './utils'

interface Avatar {
    filename: string,
    id: string,
    saved_path: string,
    date_added: Date
}

interface Profile {
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

export async function updateProfile(values): Promise<void> {
    try {
        const res = await fetch(route('profiles/current'), {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
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
            body: data
        })

        if (res.status != 200) {
            throw 'Current profile unavailable'
        }

        return res.json()
    } catch (err) {
        throw err
    }
}