
import { Link} from "react-router-dom";
import { 
    ShoppingCart, 
    Minus, 
    Plus, 
    MessageSquare, 
    Store,
    ChevronRight,
} from "lucide-react";
import type { Product } from "../types/product.type";
import { useChat, chatAPiService } from "../../chats";
import { useAuth } from "../../auth";
import "../styles/productDetail.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80";

export function ProductDetail(props : {product : Product}) {
    const product = props.product;
    const chat = useChat();
    const auth = useAuth();
    const userId = auth?.user?.userId;

    const handleChat = async () => {
        const res = await chatAPiService.createConversation(product.user.id);
        chat?.openChat(res.data.id);
    };
    const galleryImages = (product.images && product.images.length > 0)
        ? product.images
        : [
            product.thumbnail || DEFAULT_IMAGE,
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80"
        ];

    return (
        <div className="product-detail-container">
            <div className="container">
                <nav className="product-breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <Link to="/products">Sản phẩm</Link>
                    <ChevronRight size={14} className="breadcrumb-separator" />
                    <span className="breadcrumb-current">{product.name}</span>
                </nav>

                <div className="product-detail-card">
                    <div className="product-detail-gallery">
                        <div className="gallery-main-wrapper">
                            <img src={galleryImages[0]} alt={product.name} className="gallery-main-img" />
                        </div>

                        <div className="gallery-thumbs-wrapper">
                            <div className="gallery-thumbs-list">
                                {galleryImages.map((imgUrl, index) => (
                                    <div key={index} className={`gallery-thumb-item`}>
                                        <img src={imgUrl} alt="thumbnail" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="product-detail-info">
                        <div className="product-detail-title-wrapper">
                            <h1 className="product-detail-title">{product.name}</h1>
                        </div>

                        <div className="product-detail-price-box">
                            <span className="detail-price-current">{product.price}đ</span>  
                        </div>

                        <div className="detail-attr-row">
                            <div className="detail-attr-label">Số Lượng</div>
                            <div className="detail-attr-content">
                                <div className="quantity-stepper">
                                    <button type="button" className="quantity-btn"><Minus size={14} /></button>
                                    <input type="text" className="quantity-input" value="1" readOnly />
                                    <button type="button" className="quantity-btn"><Plus size={14} /></button>
                                </div>
                                <span className="stock-indicator">
                                    {product.stock && product.stock > 0 
                                        ? `${product.stock} sản phẩm có sẵn` 
                                        : "CÒN HÀNG"}
                                </span>
                            </div>
                        </div>
              
                        <div className="product-detail-actions">
                            <button type="button" className="btn-detail-add-cart">
                                <ShoppingCart size={18} />
                                <span>Thêm Vào Giỏ Hàng</span>
                            </button>

                            <button type="button" className="btn-detail-buy-now"> Mua </button>
                        </div>
                    </div>
                </div>

                <div className="product-detail-bottom">
                    <div className="seller-profile-card">
                        <div className="seller-info-left">
                            <div className="seller-meta">
                                <h4>{product.user?.name}</h4>
                                <div className="seller-online-status">
                                    <span>Online 5 phút trước</span>
                                </div>
                            </div>
                        </div>

                        <div className="seller-actions">
                            {product.user?.id !== userId && (
                                <button type="button" className="btn-seller-chat" onClick={handleChat}>
                                    <MessageSquare size={15} />
                                    <span>Chat Ngay</span>
                                </button>
                            )}
                            <button type="button" className="btn-seller-shop" style={{display: "flex", alignItems: "center",gap:"10px"}}>
                                <Store size={15} />
                                <span>Xem Shop</span>
                            </button>
                        </div>
                    </div>

                    <div className="product-description-card">
                        <h3>Mô Tả Sản Phẩm</h3>
                        <div className="description-content">
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


