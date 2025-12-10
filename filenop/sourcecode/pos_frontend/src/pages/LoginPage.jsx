import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css"; // Import file CSS hiệu ứng

const LoginPage = () => {
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate();

   const onSubmit = (data) => {
      // Logic giả lập đăng nhập
      alert(`Giả lập đăng nhập thành công!\nXin chào: ${data.username}`);
      navigate("/");
   };

   return (
      // Class bao ngoài này sẽ tạo màn hình nền đen full
      <div className="login-wrapper">
         <div className="box">
            <div className="login">
               {/* Chuyển div loginBx thành form để xử lý submit */}
               <form className="loginBx" onSubmit={handleSubmit(onSubmit)}>
                  <h2>
                     <i className="fa-solid fa-right-to-bracket"></i>
                     Login
                     <i className="fa-solid fa-heart"></i>
                  </h2>

                  <input
                     type="text"
                     placeholder="Username"
                     autoComplete="off"
                     {...register("username", { required: true })}
                  />

                  <input
                     type="password"
                     placeholder="Password"
                     {...register("password", { required: true })}
                  />

                  <input type="submit" value="Sign in" />

                  <div className="group">
                     <a href="#">Forgot Password</a>
                     {/* Link chuyển sang trang Đăng ký */}
                     <Link to="/register">Sign up</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
