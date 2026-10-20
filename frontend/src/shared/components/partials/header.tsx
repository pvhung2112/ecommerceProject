import { AnnouncementBar } from "../announcement/announcementBar";
import { SearchBar } from "../search/searchBar";
import { NavLink } from "react-router-dom";
import "../../styles/partials/header.css";
import { useAuth } from "../../../features/auth";
export function Header() {
    const auth = useAuth();
    const user = auth.user;
    return (
        <header className="header">
            <AnnouncementBar className="announcement-bar" text="Chào mừng bạn đến với NOVACOM Workspace Gear"/>
            <div className="header-main">
                <div className="container">
                    <div className="header-brand">
                        <div className="brand-logo">
                             <img src="/logo.png" alt="logo" />
                        </div>
                        <div className="logo-name">
                            <p className="logo-text">NOVACOM</p>
                            <p className="logo-subttile">workspace gear</p>
                        </div>
                    </div>
                    <SearchBar/>
                    <div className="header-account">
                        {user ? (
                            <div className="header-user">
                                <span>Xin chào, {user.profile?.fullName || user.fullName }</span>
                            </div>
                        ) : (
                            <div className="header-nullAccount">
                                <NavLink to="/login">Đăng nhập</NavLink>
                                <span>|</span>
                                <NavLink to="/register">Đăng ký</NavLink>
                            </div>
                        )}

                    </div>
                    {user && (
                         <div className="header-chat">
                           <NavLink to="/chat">Chat</NavLink>
                        </div>
                    )}
                </div>
            </div>
            <nav className="header-subnav">
                <ul>
                    <li><a href="#">Danh mục</a></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Ưu đãi</a></li>
                    <li><a href="#">Thông tin</a></li>
                    <li><a href="#">Chuyên mục</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
                <NavLink to="/tuyendung">Tuyển dụng</NavLink>
            </nav>
        </header>
    )
}