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
    // {icon: 'group', iconType: IconType.round, name: 'Groups'},
    // {icon: 'feedback', iconType: IconType.round, name: 'Feedback'},
]