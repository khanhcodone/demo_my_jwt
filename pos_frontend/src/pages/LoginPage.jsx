import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import axiosClient, { setAccessToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import "./LoginStyle.css";

const LoginPage = () => {
   const { login } = useAuth();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const navigate = useNavigate();

   // Gọi API Login
   const mutation = useMutation({
      mutationFn: (data) => {
         // Dùng axiosClient nhưng url chỉ cần phần đuôi
         return axiosClient.post("/auth/login", data);
      },
      onSuccess: (response) => {
         const { access_token, refresh_token, user } = response.data;

         // 1. Lưu Access Token vào RAM (qua hàm helper)
         setAccessToken(access_token);

         // 2. Lưu Refresh Token vào LocalStorage (để lâu dài)
         localStorage.setItem("refresh_token", refresh_token);

         login(user);
         // 3. Thông báo & Chuyển trang
         alert(`🎉 Xin chào ${user.email}!`);
         navigate("/profile");
      },
      onError: (error) => {
         alert(error.response?.data?.message || "Đăng nhập thất bại");
      },
   });

   const onSubmit = (data) => {
      mutation.mutate(data);
   };

   return (
      <div className="login-wrapper">
         <div className="box">
            <div className="login">
               <form className="loginBx" onSubmit={handleSubmit(onSubmit)}>
                  <h2>
                     <i className="fa-solid fa-right-to-bracket"></i> Login
                  </h2>

                  {/* Input Email */}
                  <input
                     type="text"
                     placeholder="Email"
                     {...register("email", { required: true })}
                  />
                  {/* Input Password */}
                  <input
                     type="password"
                     placeholder="Password"
                     {...register("password", { required: true })}
                  />

                  <input
                     type="submit"
                     value={mutation.isPending ? "Loading..." : "Sign in"}
                     disabled={mutation.isPending}
                  />

                  <div className="group">
                     <Link to="/register">Sign up</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
