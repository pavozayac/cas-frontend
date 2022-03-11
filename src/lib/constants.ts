enum IconType {
    outlined = 'material-icons-outlined',
    round = 'material-icons-round'
}

interface MenuElement {
    icon: string,
    iconType: IconType,
    name: string,
    target: string
}

export const menuElements: MenuElement[] = [
    {icon: 'home', iconType: IconType.round, name: 'Homepage', target: '/'},
    {icon: 'add', iconType: IconType.round, name: 'Post', target: '/add-reflection'},
    {icon: 'bookmark_added', iconType: IconType.round, name: 'Bookmarks', target: '/bookmarks'},
    {icon: 'groups', iconType: IconType.round, name: 'Groups', target: '/groups'},
    {icon: 'notifications', iconType: IconType.round, name: 'Notifications', target: '/notifications'},
    // {icon: 'edit_notifications', iconType: IconType.round, name: 'Manage notifications', target: '/notifications/manage'},
    // {icon: 'group', iconType: IconType.round, name: 'Groups'},
    // {icon: 'feedback', iconType: IconType.round, name: 'Feedback'},
]

export const validImageTypes = ["image/gif", "image/jpeg", "image/png"]
export const validImageExtensions = ["gif", "jpeg", "png", "jpg"]

export const pageLimit = 1