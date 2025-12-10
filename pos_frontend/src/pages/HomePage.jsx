import { Link } from "react-router-dom";
import {
   ArrowRight,
   Code2,
   Database,
   Layout,
   ShieldCheck,
   Zap,
} from "lucide-react"; // Import icon xịn
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
   const { isAuthenticated, user } = useAuth();

   return (
      <div className="relative min-h-screen bg-slate-50 overflow-hidden selection:bg-blue-100">
         {/* 1. BACKGROUND DECORATION (Hiệu ứng nền mờ ảo) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
         </div>

         {/* 2. MAIN CONTENT */}
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            {/* HERO SECTION */}
            <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6 animate-fade-in-down">
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Project Demo 2025
               </div>

               <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                  Xây dựng hệ thống <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                     Hiệu suất cao & Bảo mật
                  </span>
               </h1>

               <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                  Nền tảng quản lý hiện đại được xây dựng trên bộ ba quyền lực:
                  <strong className="text-slate-800"> NestJS</strong> xử lý
                  Backend mạnh mẽ,
                  <strong className="text-slate-800"> ReactJS</strong> cho giao
                  diện mượt mà và
                  <strong className="text-slate-800"> MongoDB</strong> lưu trữ
                  linh hoạt.
               </p>

               {/* BUTTON GROUP (Có điều kiện) */}
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {isAuthenticated ? (
                     // --- Giao diện đã login ---
                     <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 pr-6 animate-fade-in-up">
                        <img
                           src={`https://ui-avatars.com/api/?name=${user?.email}&background=0D8ABC&color=fff`}
                           alt="avatar"
                           className="w-12 h-12 rounded-xl"
                        />
                        <div className="text-left">
                           <p className="text-xs text-slate-500 font-medium">
                              Xin chào,
                           </p>
                           <p className="text-sm font-bold text-slate-800">
                              {user?.email}
                           </p>
                        </div>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <Link
                           to="/profile"
                           className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                        >
                           Vào Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                  ) : (
                     // --- Giao diện khách ---
                     <>
                        <Link
                           to="/register"
                           className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                           <Zap className="w-5 h-5" />
                           Bắt đầu ngay
                        </Link>
                        <Link
                           to="/login"
                           className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                        >
                           Đăng nhập
                        </Link>
                     </>
                  )}
               </div>
            </div>

            {/* FEATURE GRID (Giới thiệu công nghệ) */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                     <Layout className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                     Frontend ReactJS
                  </h3>
                  <p className="text-slate-500">
                     Giao diện người dùng mượt mà, tối ưu trải nghiệm với React
                     Hooks, React Query và Tailwind CSS.
                  </p>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                     <Code2 className="w-6 h-6 text-red-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                     Backend NestJS
                  </h3>
                  <p className="text-slate-500">
                     Kiến trúc module chặt chẽ, dễ dàng mở rộng. Tích hợp JWT
                     Authentication và Swagger UI.
                  </p>
               </div>

               {/* Card 3 */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-300">
                     <Database className="w-6 h-6 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                     Database MongoDB
                  </h3>
                  <p className="text-slate-500">
                     Cơ sở dữ liệu NoSQL linh hoạt, hiệu năng cao, phù hợp cho
                     các ứng dụng hiện đại.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
