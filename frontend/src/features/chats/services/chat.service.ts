import axios from "../../../lib/axios";


export const chatAPiService = {
    getAllConversation : async () => {
       const response =  await axios.get("/chats/conversation");
       return response.data;
    },
    getDetailConversation : async (conversationId: string)=>{
       const response = await axios.get(`/chats/conversation/${conversationId}`);
       return response.data;
    },
    createConversation : async (receiverId: string)=>{
        const response = await axios.post("/chats/conversation/create",{receiverId});
        return response.data;
    },
    getMessagesByConversationId: async (conversationId: string) => {
    const response = await axios.get(`/chats/message/conversation/${conversationId}`);
    return response.data;
    },
    sendMessage: async (content: string, conversationId: string) => {
    const response = await axios.post(`/chats/message/send`, { content, conversationId });
    return response.data;
    }
}