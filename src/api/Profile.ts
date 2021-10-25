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

export async function current_profile(): Promise<Profile> {
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