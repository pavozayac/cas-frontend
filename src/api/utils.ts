export const backendUrl = 'http://localhost:8000/'

export function route(route: string): string {
    return `${backendUrl}${route}`
}

export function avatarSrc(avatar): string {
    return `${backendUrl}profiles/avatar/${avatar.id}`
}

export function attachmentSrc(reflection, attachment){
    return `${backendUrl}reflections/${reflection.id}/attachment/${attachment.id}`
}

export function remove(array, value){
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            array = array.splice(i+1, 1)
        }
    }
    return array
}

export function hasObject(array, value){
    let result = false
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            result = true
            break
        }
    }
    return result
}