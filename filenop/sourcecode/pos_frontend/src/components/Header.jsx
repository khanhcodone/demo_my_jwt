import { Link, useLocation } from "react-router-dom";
import { Layout, LogIn, UserPlus } from "lucide-react";

const Header = () => {
   const location = useLocation();
   const isActive = (path) => location.pathname === path;

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
                  <Link
                     to="/login"
                     className={`hidden md:flex items-center gap-2 text-sm font-medium transition hover:text-blue-600 ${
                        isActive("/login") ? "text-blue-600" : "text-gray-600"
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
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
