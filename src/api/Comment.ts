import { route } from "./utils"
import type { Pagination } from "./utils";

export interface BulkComment {
    id: number
}

export interface Comment {
    id: number
    content: string,
    profile_id: number,
    reflection_id: number,
    date_added: Date
}

export interface CommentSorts {
    date_added?: string;
}

export interface FilterBody {
    sorts: CommentSorts;
    pagination: Pagination;
}

export async function queryComments(reflection_id, filters: FilterBody): Promise<[BulkComment[], number]> {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/comments/query`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters),
        })

        if (res.status != 200) {
            throw await res.text();
        }
        
        const resBody = await res.json();
        return [resBody.items, resBody.count];

    } catch (err) {
        throw err;
    }
}

export async function getComment(reflection_id: number, comment_id: number): Promise<Comment> {
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

export async function postComment(comment, reflection_id) {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/comments`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                ...comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();

    } catch (err) {
        throw err;
    }
}

export async function deleteComment(comment_id, reflection_id) {
    try {
        const res = await fetch(route(`reflections/${reflection_id}/comments/${comment_id}`), {
            method: 'DELETE',
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