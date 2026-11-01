import type React from "react";
import { authApiService } from "../services/auth.service";
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate(); 
  const location = useLocation();

  const auth = useAuth();

  const isSeller = location.pathname.includes("/seller");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());


      const response = await authApiService.login({
        email: data.email as string,
        password: data.password as string,
      });

        auth.login(response.data);
      alert("Đăng nhập thành công!");

      navigate(isSeller ? "/cellers" : "/");
   
  };

  return (
    <div className="auth-form-box">
      <h2 className="form-title">Đăng nhập</h2>

      <form onSubmit={handleLogin} className="form-content">
        <input 
          type="text" 
          name="email" 
          className="form-input" 
          placeholder="Email hoặc Tên đăng nhập" 
          required 
        />

        <input 
          type="password" 
          name="password" 
          className="form-input" 
          placeholder="Mật khẩu" 
          required 
        />

        <button type="submit" className="form-btn-submit">
          ĐĂNG NHẬP
        </button>
      </form>

      <div className="form-footer">
        <span>Chưa có tài khoản? </span>
        <Link to={isSeller ? "/seller/register" : "/register"} className="form-link">
          Đăng ký
        </Link>
      </div>
    </div>
  );
}


