interface propsAnnouncementBar {
    text?: string
}

export function AnnouncementBar({ text }: propsAnnouncementBar) {
    return (
        <div className="announcement-bar">
            <div className="announcement-text"> {text}</div>
        </div>
    )
}