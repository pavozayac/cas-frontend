import { Pagination, route } from "./utils";

interface Notification {
    content: string;
    date_sent: string;
}

interface NotificationSorts {

}

interface NotificationFilters {

}

interface FilterBody {
    sorts: NotificationSorts;
    filters: NotificationFilters;
    pagination: Pagination;
}

export async function postNotification(values) {
    try {
        const res = await fetch(route(`post-notifications`), {
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

export async function getGroup(filterBody: NotificationFilters): Promise<Notification> {
    try {
        const res = await fetch(route(`post-notifications/received/query`), {
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