import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// QUAN TRỌNG: Import lại file CSS giao diện cũ để dùng chung hiệu ứng
import "./LoginStyle.css";

const SignUpPage = () => {
   const navigate = useNavigate();
   const [serverError, setServerError] = useState("");

   // 1. Cấu hình Form
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // 2. Cấu hình API (Gọi sang Backend NestJS)
   const API_URL = "https://my-backend-api-1mvw.onrender.com";

   const mutation = useMutation({
      mutationFn: (newUser) => {
         return axios.post(`${API_URL}/users/register`, newUser);
      },
      onSuccess: () => {
         alert("✅ Đăng ký thành công! Đăng nhập ngay nhé.");
         navigate("/login");
      },
      onError: (error) => {
         const msg = error.response?.data?.message;
         setServerError(msg);
      },
   });

   // 3. Xử lý khi bấm nút Submit
   const onSubmit = (data) => {
      setServerError("");
      mutation.mutate(data);
   };

   return (
      // Sử dụng lại class 'login-wrapper' để có nền đen full màn hình
      <div className="login-wrapper">
         {/* Hiệu ứng Glowing Box */}
         <div className="box">
            <div className="login">
               {/* Form logic nằm trong này */}
               <form className="loginBx" onSubmit={handleSubmit(onSubmit)}>
                  <h2>
                     <i className="fa-solid fa-user-plus"></i>{" "}
                     {/* Đổi icon thành hình người */}
                     Sign Up
                     <i className="fa-solid fa-heart"></i>
                  </h2>

                  {/* Hiển thị lỗi từ Server (nếu có) */}
                  {serverError && (
                     <p
                        style={{
                           color: "#ff2770",
                           fontSize: "0.8rem",
                           textAlign: "center",
                           margin: "-10px 0 10px",
                        }}
                     >
                        {serverError}
                     </p>
                  )}

                  {/* Input Email */}
                  <div style={{ width: "100%" }}>
                     <input
                        type="text"
                        placeholder="Email Address"
                        autoComplete="off"
                        {...register("email", {
                           required: "Vui lòng nhập Email",
                           pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email không hợp lệ",
                           },
                        })}
                     />
                     {/* Lỗi validation (nhỏ xíu bên dưới) */}
                     {errors.email && (
                        <span
                           style={{
                              color: "#ff2770",
                              fontSize: "0.7rem",
                              paddingLeft: "15px",
                           }}
                        >
                           {errors.email.message}
                        </span>
                     )}
                  </div>

                  {/* Input Password */}
                  <div style={{ width: "100%" }}>
                     <input
                        type="password"
                        placeholder="Create Password"
                        {...register("password", {
                           required: "Vui lòng nhập mật khẩu",
                           minLength: {
                              value: 6,
                              message: "Tối thiểu 6 ký tự",
                           },
                        })}
                     />
                     {errors.password && (
                        <span
                           style={{
                              color: "#ff2770",
                              fontSize: "0.7rem",
                              paddingLeft: "15px",
                           }}
                        >
                           {errors.password.message}
                        </span>
                     )}
                  </div>

                  {/* Nút Submit */}
                  <input
                     type="submit"
                     value={mutation.isPending ? "Signing up..." : "Register"}
                     disabled={mutation.isPending}
                     style={{ opacity: mutation.isPending ? 0.7 : 1 }}
                  />

                  {/* Link chuyển qua Login */}
                  <div className="group">
                     <a href="#">Need Help?</a>
                     <Link to="/login">Sign in</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SignUpPage;
