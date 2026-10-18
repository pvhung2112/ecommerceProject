import type React from "react";
import { authApiService } from "../services/auth.service"; 

function RegisterForm() {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Dữ liệu nhập vào:", data);
    
    try {
      const response = await authApiService.register({
        email: data.email as string,
        password: data.password as string,
        fullName: (data.fullName as string) || "",
      });

      console.log("Backend trả về thành công:", response);
      alert("Đăng ký thành công!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <input type="text" name="fullName" placeholder="Họ và tên" />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng ký</button>
      </form>
    </>
  );
}

export default RegisterForm;