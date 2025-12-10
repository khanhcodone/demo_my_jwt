import { createContext, useContext, useState, useEffect } from "react";
import { setAccessToken } from "../api/axiosClient";
import { useQueryClient } from "@tanstack/react-query";

// 1. Tạo Context
const AuthContext = createContext();

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading để tránh màn hình nhấp nháy khi F5

   const queryClient = useQueryClient();
   // Kiểm tra lúc mới vào web (F5 trang)
   useEffect(() => {
      const checkLogin = () => {
         const token = localStorage.getItem("refresh_token");
         // Lấy thông tin user đã lưu (nếu có) để khi F5 không bị mất tên
         const savedUser = localStorage.getItem("user_info");

         if (token) {
            setIsAuthenticated(true);
            if (savedUser) {
               setUser(JSON.parse(savedUser)); // Khôi phục thông tin user
            }
         }
         setIsLoading(false);
      };

      checkLogin();
   }, []);

   const login = (userData) => {
      setUser(userData);
      setIsAuthenticated(true);
      // Lưu thông tin user vào localStorage để F5 không bị mất
      localStorage.setItem("user_info", JSON.stringify(userData));
   };

   const logout = () => {
      console.log("Đang đăng xuất...");

      // 1. Xóa token RAM
      setAccessToken(null);

      // 2. Xóa localStorage
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_info"); // Xóa luôn thông tin user

      // 3. Reset State
      setUser(null);
      setIsAuthenticated(false);
      // xoá user
      queryClient.clear();
   };

   return (
      <AuthContext.Provider
         value={{ user, isAuthenticated, isLoading, login, logout }}
      >
         {/* Chỉ hiển thị app khi đã kiểm tra xong trạng thái đăng nhập */}
         {!isLoading && children}
      </AuthContext.Provider>
   );
};

// 3. Hook dùng chung
export const useAuth = () => useContext(AuthContext);
