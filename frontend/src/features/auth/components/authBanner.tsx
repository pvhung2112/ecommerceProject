import { Check } from "lucide-react";

interface AuthBannerProps {
    subTitle: string;
    title: string;
    benefits: string[];
}

export function AuthBanner({ subTitle, title, benefits }: AuthBannerProps) {
    return (
        <div className="auth-banner">
            <span className="banner-subtitle">{subTitle}</span>
            <h1 className="banner-title">{title}</h1>
            <ul className="banner-benefits">
                {benefits.map((item, index) => (
                    <li key={index} className="benefit-item">
                        <Check className="benefit-icon" size={20} strokeWidth={2.5} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

