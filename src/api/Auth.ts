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

    if (!res.ok) {
        console.log()
        throw new Error('Authentication error');
    }
    
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

export async function confirmEmail(code: string) {
    const res = await fetch(route(`confirm-email/${code}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    })
    // const body = await res.json()

    if (!res.ok) {
        throw 'Confirmation code invalid'
    }
}

export async function sendRecoveryRequest(email: string) {
    const res = await fetch(route(`send-recovery-mail`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
            email
        })
    })
    // const body = await res.json()

    if (!res.ok) {
        throw 'Confirmation code invalid'
    }
}

export async function resetPassword(code: string, values) {
    const res = await fetch(route(`recover-password/${code}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(values)
    })
    // const body = await res.json()

    if (!res.ok) {
        throw 'Confirmation code invalid'
    }
}