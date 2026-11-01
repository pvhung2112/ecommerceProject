import { Search } from "lucide-react";
import "../../styles/search/searchBar.css";

export function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm"/>
            <button type="button">
                <Search size={18} />
            </button>
        </div>
    );
}
