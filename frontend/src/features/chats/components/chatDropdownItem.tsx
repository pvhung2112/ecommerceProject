export function ChatDropdownItem(props: any) {
    const { conversation, userId, onSelect } = props;
    const partner = conversation.users?.find((u: any) => u.id !== userId);
    return(  
        <div key={conversation.id}>
            <p>{partner.name}</p>
        </div>
    )
}