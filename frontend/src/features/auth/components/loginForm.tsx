import type React from "react";
import { authApiService } from "../services/auth.service";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const navigate = useNavigate(); 
  const auth = useAuth();
  const login = auth.login;
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Dữ liệu nhập vào:", data);

      const response = await authApiService.login({
        email: data.email as string,
        password: data.password as string,
      });
      console.log("Backend trả về thành công:", response);
      login(response.data);
      alert("Đăng nhập thành công!");
      navigate("/");

  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" name="email" placeholder="Username or Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;