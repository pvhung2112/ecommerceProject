import { Outlet, useLocation } from "react-router-dom";
import { AuthBanner } from "../../features/auth";
import "../styles/layouts/authLayout.css";

export function AuthLayout() {
    const { pathname } = useLocation();

    let bannerData = {
        subTitle: "NOVACOM Workspace",
        title: "Chào mừng bạn quay trở lại",
        benefits: [
            "Mua sắm bàn phím, chuột công thái học chính hãng",
            "Bảo hành 1 đổi 1 nhanh chóng toàn quốc",
            "Hỗ trợ kỹ thuật và giao hàng tận nơi"
        ]
    };

    if (pathname === "/register") {
        bannerData = {
            subTitle: "NOVACOM Workspace",
            title: "Trở thành Thành viên mới",
            benefits: [
                "Ưu đãi voucher giảm giá cho đơn hàng đầu tiên",
                "Miễn phí vận chuyển toàn quốc cho đơn từ 500k",
                "Tích điểm đổi quà sau mỗi lần mua hàng"
            ]
        };
    } else if (pathname === "/seller/login") {
        bannerData = {
            subTitle: "KÊNH NGƯỜI BÁN",
            title: "Đăng nhập Kênh Người Bán",
            benefits: [
                "Quản lý đơn hàng và doanh thu thời gian thực",
                "Hệ thống Chat Realtime chăm sóc khách hàng tức thì",
                "Đồng bộ kho hàng và tối ưu chiến dịch Flash Sale"
            ]
        };
    } else if (pathname === "/seller/register") {
        bannerData = {
            subTitle: "NOVACOM Việt Nam",
            title: "Trở thành Người bán ngay hôm nay",
            benefits: [
                "Nền tảng thương mại điện tử hàng đầu",
                "Phát triển trở thành thương hiệu uy tín",
                "Tiếp cận hàng triệu khách hàng yêu công nghệ"
            ]
        };
    }

    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-banner-side">
                    <AuthBanner 
                        subTitle={bannerData.subTitle}
                        title={bannerData.title}
                        benefits={bannerData.benefits}
                    />
                </div>
                <div className="auth-form-side">
                    <div className="auth-card">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
