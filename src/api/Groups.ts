import type { Profile } from "./Profile";
import { Pagination, route } from "./utils";

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
    full_text_con?: string;
}

export interface GroupSorts {
    date_created?: 'asc' | 'desc';
    name?: 'asc' | 'desc';
}

export interface FilterBody {
    sorts: GroupSorts;
    filters: GroupFilters;
    pagination: Pagination;
}

export async function filterGroups(body: FilterBody): Promise<[BulkGroup[], number]> {
    try {
        const res = await fetch(route('groups/query'), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }
        
        const { items, count } = await res.json();
        return [items, count];
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

export async function deleteGroup(id: string): Promise<Group> {
    try {
        const res = await fetch(route(`groups/${id}`), {
            method: 'DELETE',
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


export async function updateGroupAvatar(values, group_id) {
    let file: File = values.file
    let data = new FormData()
    data.append('file', file)

    try {
        const res = await fetch(route(`groups/${group_id}/avatar/`), {
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

        await updateGroupAvatar(group, detail.id);

        return detail;

    } catch (err) {
        throw err;
    }
}


export async function updateGroup(group, group_id) {
    const { file, ...groupData } = group;

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

export interface GroupJoinRequest {
    id: number;
    group_id: string;
    profile: Profile;
    date_added: Date;
}

export async function createGroupJoinRequest(groupCode: string) {
    try {
        const res = await fetch(route(`groups/${groupCode}/join-requests`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            if (res.status == 409){
                throw 'Join request has already been sent'
            } else{
                throw await res.text()
            }
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

export async function getJoinRequests(group_id) {
    try {
        const res = await fetch(route(`groups/${group_id}/join-requests`), {
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

export async function acceptJoinRequest(group_id, profile_id) {
    try {
        const res = await fetch(route(`groups/${group_id}/accept-request/${profile_id}`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

export async function denyJoinRequest(group_id, profile_id) {
    try {
        const res = await fetch(route(`groups/${group_id}/deny-request/${profile_id}`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

export async function deleteMember(group_id, profile_id) {
    try {
        const res = await fetch(route(`groups/${group_id}/delete-member/${profile_id}`), {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();
    } catch (err) {
        throw err
    }
}

