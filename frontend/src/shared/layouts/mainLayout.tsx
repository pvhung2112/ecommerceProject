import { Footer } from "../components/partials/footer";
import { Header } from "../components/partials/header";
import { Outlet } from "react-router-dom";
import { MiniChatboxManager } from "../../features/chats";

export function MainLayout() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <MiniChatboxManager />
            <Footer />
        </>
    );
}

