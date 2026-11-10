import { RouterApp } from "./routes/index.route";
import { AuthProvider } from "./features/auth";
import { ChatProvider } from "./features/chats/context/chat.context";


export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RouterApp />
      </ChatProvider>
    </AuthProvider>
  );
}
