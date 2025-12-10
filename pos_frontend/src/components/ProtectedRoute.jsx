import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
   const { isAuthenticated, isLoading } = useAuth();

   // 1. Nếu đang kiểm tra (F5 trang), hiện màn hình chờ để tránh đá user ra oan
   if (isLoading) {
      return <div className="text-center mt-20">Loading...</div>;
   }

   // 2. Nếu không đăng nhập -> Đá về Login
   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   // 3. Nếu OK -> Cho đi tiếp vào các trang con (Outlet)
   return <Outlet />;
};

export default ProtectedRoute;
