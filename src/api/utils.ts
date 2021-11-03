export const backendUrl = 'http://localhost:8000/'

export function route(route: string): string {
    return `${backendUrl}${route}`
}

export function avatarSrc(avatar): string {
    return `${backendUrl}profiles/avatar/${avatar.id}`
}