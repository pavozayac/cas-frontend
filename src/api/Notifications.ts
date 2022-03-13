import { Pagination, route } from "./utils";

export interface Notification {
    content: string;
    read: boolean;
    date_sent: string;
}

export interface NotificationRecipient {
    profile_id: number
}

export interface NoReadNotification {
    content: string;
    date_sent: string;
    notification_recipients: NotificationRecipient[]
}

export interface BulkNotification {
    id: number;
}

// interface NotificationRecipientFilters {
//     read?: boolean;
// }

export interface NotificationSorts {
    date_sent?: string;
    read_omit?: 'asc' | 'desc';
}

export interface NotificationFilters {
    read?: boolean
}

export interface FilterBody {
    sorts: NotificationSorts;
    filters: NotificationFilters;
    pagination: Pagination;
}

export interface AuthoredFilterBody {
    sorts: NotificationSorts;
    pagination: Pagination;
}

export async function postNotification(values) {
    try {
        const res = await fetch(route(`notifications`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                content: values.content,
                recipients: values.recipients
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

export async function filterNotifications(filterBody: FilterBody): Promise<[BulkNotification[], number, number]> {
    try {
        const res = await fetch(route(`notifications/received/query`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(filterBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }

        const resBody = await res.json();
        return [resBody.items, resBody.count, resBody.readCount];

    } catch (err) {
        throw err
    }
}

export async function getNotification(id: number, noRead = false): Promise<Notification | NoReadNotification> {
    const getRoute = noRead ? route(`notifications/posted/${id}`) : route(`notifications/${id}`)

    try {
        const res = await fetch(getRoute, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();

    } catch (err) {
        throw err
    }
}

export async function toggleRead(id: number) {
    try {
        const res = await fetch(route(`notifications/${id}/read_toggle`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors'
        })

        if (res.status != 200) {
            throw await res.text()
        }

    } catch (err) {
        throw err
    }
}

export async function filterAuthoredNotifications(filterBody: AuthoredFilterBody): Promise<[BulkNotification[], number, number]> {
    try {
        const res = await fetch(route(`notifications/posted/query`), {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(filterBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status != 200) {
            throw await res.text()
        }

        const resBody = await res.json();
        return [resBody.items, resBody.count, resBody.readCount];

    } catch (err) {
        throw err
    }
}

export async function deleteNotification(id: number) {
    try {
        const res = await fetch(route(`notifications/${id}`), {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
        })

        if (res.status != 200) {
            throw await res.text();
        }

        return await res.json();

    } catch (err) {
        throw err;
    }
}   