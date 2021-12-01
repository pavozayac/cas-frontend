import { route } from "./utils";

export interface Group {
    id: string;
    name: string;
    description: string;
    graduation_year: number;
    coordinator_id: number;
    date_created: Date;
    avatar: Avatar;
    members_count: number;
    reflections_count: number;
}

export interface BulkGroup {
    id: string;
}

interface Avatar {
    filename: string;
    id: string;
    saved_path: string;
    date_added: Date;
}

export interface GroupFilters {
    coordinator_id?: number;
    name?: string;
    date_created_gte?: Date;
    date_created_lte?: Date;
}

export interface GroupSorts {
    date_created?: 'asc' | 'desc';
    name?: 'asc' | 'desc';
}

export async function filterGroups(sorts: GroupSorts, filters: GroupFilters): Promise<Group[]> {
    try {
        const res = await fetch(route('groups/query'), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                filters: filters,
                sorts: sorts
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}


export async function getGroup(id: string): Promise<Group> {
    try {
        const res = await fetch(route(`groups/${id}`), {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}


export async function updateGroupAvatar(values) {
    let file: File = values.file
    let data = new FormData()
    data.append('file', file)

    try {
        const res = await fetch(route('groups/avatar/'), {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: data
        })

        if (res.status != 200) {
            throw await res.text()
        }

        return res.json()
    } catch (err) {
        throw err
    }
}

export async function createGroup(group) {
    const { file, ...groupData } = group

    try {
        const res = await fetch(route(`groups`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                ...groupData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text();
        }


        const detail = await res.json();

        await updateGroupAvatar(group)

        return detail;

    } catch (err) {
        throw err;
    }
}


export async function updateGroup(group, group_id) {
    const { file, ...groupData } = group

    try {
        const res = await fetch(route(`groups/${group_id}`), {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                ...groupData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text();
        }


        const detail = await res.json();

        if (file){
            await updateGroupAvatar(group)
        }

        return detail;

    } catch (err) {
        throw err;
    }
}