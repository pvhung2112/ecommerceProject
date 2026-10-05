import type React from "react";
import { authService } from "../services/auth.service";

export function LoginForm() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Dữ liệu nhập vào:", data);

      const response = await authService.login({
        email: data.email as string,
        password: data.password as string,
      });

      console.log("Backend trả về thành công:", response);
      alert("Đăng nhập thành công!");

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