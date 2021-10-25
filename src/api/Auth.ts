import { route } from './utils'
import 'axios'
import axios from 'axios'

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
        credentials: 'include'
    })

    return res.json()
}

export async function logout() {
    const res = await fetch(route('logout'))
}