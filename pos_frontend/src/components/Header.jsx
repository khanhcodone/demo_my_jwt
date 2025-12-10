import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const isActive = (path) => location.pathname === path;
   const { isAuthenticated, logout, user } = useAuth();
   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
               <nav className="hidden md:flex items-center gap-8 mx-6">
                  <Link
                     to="/"
                     className={`text-sm font-medium transition hover:text-blue-600 ${
                        isActive("/") ? "text-blue-600" : "text-gray-600"
                     }`}
                  >
                     Trang chủ
                  </Link>
                  <a
                     href="#"
                     className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                  >
                     Tính năng
                  </a>
                  <a
                     href="#"
                     className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                  >
                     Giới thiệu
                  </a>
               </nav>

               {/* 3. AUTH BUTTONS */}
               <div className="flex items-center gap-4 shrink-0">
                  {isAuthenticated ? (
                     // TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP
                     <div className="flex items-center gap-4">
                        <Link
                           to="/profile"
                           className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
                        >
                           <User className="w-4 h-4" />
                           <span>Hồ sơ</span>
                        </Link>

                        <button
                           onClick={handleLogout}
                           // Dùng style tương tự nút Đăng ký nhưng đổi màu sang đỏ nhẹ để cảnh báo
                           className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-full transition"
                        >
                           <LogOut className="w-4 h-4" />
                           <span>Đăng xuất</span>
                        </button>
                     </div>
                  ) : (
                     // TRƯỜNG HỢP CHƯA ĐĂNG NHẬP
                     <>
                        <Link
                           to="/login"
                           className={`hidden md:flex items-center gap-2 text-sm font-medium transition hover:text-blue-600 ${
                              isActive("/login")
                                 ? "text-blue-600"
                                 : "text-gray-600"
                           }`}
                        >
                           <LogIn className="w-4 h-4" />
                           Đăng nhập
                        </Link>

                        <Link
                           to="/register"
                           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition shadow-lg shadow-blue-500/20 whitespace-nowrap"
                        >
                           <UserPlus className="w-4 h-4" />
                           Đăng ký ngay
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
