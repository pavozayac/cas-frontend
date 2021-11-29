import { route } from "./utils";

export interface Group {
    name: string;
    graduation_year: number;
    coordinator_id: number;
    date_created: Date;
    avatar: Avatar;
}

interface Avatar {
    filename: string;
    id: string;
    saved_path: string;
    date_added: Date;
}


export async function createGroup(group) {
    try {
        const res = await fetch(route(`groups`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                ...group
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