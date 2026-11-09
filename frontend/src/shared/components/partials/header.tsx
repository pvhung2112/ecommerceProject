import { useState } from "react";
import { SearchBar } from "../search/searchBar";
import { NavLink } from "react-router-dom";
import { Bell, ShoppingCart } from "lucide-react";
import "../../styles/partials/header.css";
import { useAuth } from "../../../features/auth";
import { ChatDropdownList } from "../../../features/chats";

export function Header() {
    const auth = useAuth();
    const user = auth?.user;
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <header className="header" >
            <div className="header-topbar">
                <div className="container">
                    <div className="topbar-left">
                        <NavLink to="/seller/login">Kênh Người Bán</NavLink>
                        <span className="topbar-divider">|</span>
                        <NavLink to="/seller/register">Trở thành Người bán</NavLink>
                    </div>
                    <div className="topbar-right">
                        <span className="topbar-notify">
                            <Bell size={14} />
                            <span>Thông Báo</span>
                        </span>
                        {user && (
                            <div className="header-chat-wrapper" style={{position : "relative"}}>
                                <span onClick={()=>{
                                    setIsChatOpen(pre => !pre)              
                                }}>chat</span>
                                {isChatOpen && (
                                    <ChatDropdownList/>
                                )}
                            </div>
                        )}
                        <div className="header-account">
                            {user ? (
                                <div className="header-user">
                                    <span>{user.profile?.fullName || user.fullName}</span>
                                </div>
                            ) : (
                                <div className="header-nullAccount">
                                    <NavLink to="/login">Đăng nhập</NavLink>
                                    <span className="topbar-divider">|</span>
                                    <NavLink to="/register">Đăng ký</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-main">
                <div className="container">
                    <NavLink to="/" className="header-brand">
                        <div className="brand-logo">
                            <img src="/logo.png" alt="logo" />
                        </div>
                        <div className="logo-name">
                            <p className="logo-text">NOVACOM</p>
                            <p className="logo-subttile">workspace gear</p>
                        </div>
                    </NavLink>
                    <SearchBar />
                    <div className="header-cart">
                        <NavLink to="/cart" className="cart-btn" title="Giỏ hàng">
                            <ShoppingCart size={24} />
                            <span className="cart-badge">0</span>
                        </NavLink>
                    </div>
                </div>
            </div>

            <nav className="header-subnav">
                <div className="container subnav-container">
                    <ul>
                        <li><a href="#">Danh mục</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Ưu đãi</a></li>
                        <li><a href="#">Thông tin</a></li>
                        <li><a href="#">Chuyên mục</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                    <NavLink to="/tuyendung" className="subnav-hiring">Tuyển dụng</NavLink>
                </div>
            </nav>
        </header>
    );
}
