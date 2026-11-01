import type React from "react";
import { authApiService } from "../services/auth.service"; 
import { useNavigate, Link } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());


      const response = await authApiService.register({
        email: data.email as string,
        password: data.password as string,
      });

      console.log(response);
      alert("Đăng ký thành công");
      navigate("/login");
  };

  return (
    <div className="auth-form-box">
      <h2 className="form-title">Đăng ký</h2>

      <form onSubmit={handleRegister} className="form-content">
        <input 
          type="email" 
          name="email" 
          className="form-input" 
          placeholder="Email" 
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
          ĐĂNG KÝ
        </button>
      </form>

      <div className="form-footer">
        <span>Đã có tài khoản? </span>
        <Link to="/login" className="form-link">Đăng nhập</Link>
      </div>
    </div>
  );
}

