import { AnnouncementBar } from "../announcement/announcementBar";
import { SearchBar } from "../search/searchBar";
import { NavLink } from "react-router-dom";
export function Header() {
    return (
        <header className="header">
            <AnnouncementBar text="hello" />
            <div className="header-main">
                <div className="header-brand">
                    <img src="" alt="logo" />
                    <div className="logo-name">
                        <p className="logo-text">NOVACOM</p>
                        <p className="logo-subttile">ecommercy space</p>
                    </div>
                </div>
                <SearchBar/>
                <div className="header-account">
                    <div className="header-nullAccount">
                        <NavLink to="/login">Đăng nhập</NavLink>
                        <span>|</span>
                        <NavLink to="/register">Đăng ký</NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}