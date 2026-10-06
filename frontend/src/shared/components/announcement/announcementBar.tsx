interface propsAnnouncementBar {
    text?: string,
    className?: string
}

export function AnnouncementBar({ text, className }: propsAnnouncementBar) {
    return (
        <div className={className}>
             <span className="announcement-text">{text}</span>
        </div>
    )
}