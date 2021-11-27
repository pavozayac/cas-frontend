import { route } from "./utils"

export interface BulkComment {
    comment_id: number
}

export interface Comment {
    comment_id: number
    content: string,
    profile_id: number,
    reflection_id: number,
    date_added: Date
}

export async function queryComments(reflection_id): Promise<BulkComment[]> {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/comments/query`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();

    } catch (err) {
        throw err;
    }
}

export async function getComment(reflection_id, comment_id): Promise<Comment> {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/comments/${comment_id}`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();

    } catch (err) {
        throw err;
    }
}

export async function postComment() {
    
}