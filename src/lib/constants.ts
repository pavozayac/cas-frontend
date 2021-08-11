enum IconType {
    outlined = 'material-icons-outlined',
    round = 'material-icons-round'
}

interface MenuElement {
    icon: string,
    iconType: IconType,
    name: string
}

export const menuElements: MenuElement[] = [
    {icon: 'home', iconType: IconType.round, name: 'Homepage'},
    {icon: 'description', iconType: IconType.round, name: 'Reflections'},
    {icon: 'bookmark_added', iconType: IconType.round, name: 'Bookmarks'},
    {icon: 'group', iconType: IconType.round, name: 'Groups'},
    {icon: 'feedback', iconType: IconType.round, name: 'Feedback'},
]