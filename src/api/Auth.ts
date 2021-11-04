import { route } from './utils'
import 'axios'
import axios from 'axios'
import { profileStore } from 'stores/profile'

export interface JWT {
    access_token: string,
    token_type: string
}

export async function login(email: string, password: string): Promise<JWT> {
    // const res = await axios.post(route('login'), { email, password })

    const res = await fetch(route('login'), {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        mode: 'cors',

    })
    const response = await res.json()
    profileStore.set(response)
    return response
}

export async function logout() {
    const res = await fetch(route('logout'), {
        method: 'POST',
        credentials: 'include',
        mode: 'cors'
    })

    const response = await res.json()
    profileStore.set(null)
    return response
}

export async function register(values) {
    const res = await fetch(route('register'), {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    })
}