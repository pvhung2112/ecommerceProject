import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { chatAPiService } from "../../../features/chats/services/chat.service";
import socket from "../../../lib/socket";
function ChatPage() {
    const location = useLocation();
    const [conversation, setConversation] = useState(null);
    const [message, setMessage] = useState("");
    const [listMessage, setListMessage] = useState([]);
    const getInformationUser = async () => {
            const respondInformation = await chatAPiService.getDetailConversation(location.state.conversationId);
            console.log(respondInformation);
            setConversation(respondInformation.data);
            console.log(conversation)
        }

    const getMessageUser = async () => {
        const respondMessage = await chatAPiService.getMessagesByConversationId(location.state.conversationId);
        console.log(respondMessage);
        setListMessage(respondMessage.data)
    }
    useEffect(() => {
        getInformationUser();
        getMessageUser();
    }, []);
    const sendMessage = async (message: string) => {
        const respondMessage = await chatAPiService.sendMessage(message, location.state.conversationId);
        console.log(respondMessage);
        setMessage(""); 
    }
    useEffect(()=>{
        socket.emit("chat:join-conversation",location.state.conversationId);
        socket.on("chat:receive-Message",(data)=>{
            console.log(data);
            setListMessage((prev)=>[...prev,data])
        })
        return () => {
            socket.off("chat:receive-Message")
            socket.emit("chat:leave-conversation", location.state.conversationId);
        }
    },[location.state.conversationId])

    return (
        <div>
            <h1>đây là trang chat</h1>
            <div >
                {conversation?.users?.[0]?.name}
                <div>
                    {
                        listMessage.map((item) => {
                            return (
                                <div key={item.id} className="flex">
                                    <p>{item.sender.name} : {item.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={() => sendMessage(message)}>Gửi</button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;