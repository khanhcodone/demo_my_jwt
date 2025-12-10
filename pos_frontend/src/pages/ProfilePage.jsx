import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, LogOut, Loader2, Fingerprint } from "lucide-react"; // Import icon đẹp

const ProfilePage = () => {
   const navigate = useNavigate();
   // Chỉ lấy hàm logout từ Context, không tự xóa token thủ công ở đây
   const { logout } = useAuth();

   // Gọi API lấy thông tin Profile
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["userProfile"],
      queryFn: async () => {
         const res = await axiosClient.get("/users/profile");
         return res.data;
      },
      retry: 1,
   });

   const handleLogout = () => {
      logout(); // Gọi hàm dọn dẹp của Context
      navigate("/login");
   };

   // --- 1. GIAO DIỆN LOADING ---
   if (isLoading)
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">
               Đang tải dữ liệu bảo mật...
            </p>
         </div>
      );

   // --- 2. GIAO DIỆN LỖI ---
   if (isError)
      return (
         <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center border border-red-100">
               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
               </div>
               <h3 className="text-lg font-bold text-slate-800 mb-2">
                  Không thể tải hồ sơ
               </h3>
               <p className="text-slate-500 text-sm mb-6">{error.message}</p>
               <button
                  onClick={() => navigate("/login")}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
               >
                  Về trang đăng nhập
               </button>
            </div>
         </div>
      );

   // Xử lý dữ liệu an toàn (đề phòng API trả về cấu trúc khác)
   // Giả sử API trả về: { message: "...", user: { ... } }
   const userInfo = data?.user || {};

   // --- 3. GIAO DIỆN CHÍNH (SUCCESS) ---
   return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
         <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in-up">
            {/* Header màu mè */}
            <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <img
                     src={`https://ui-avatars.com/api/?name=${userInfo.email}&background=ffffff&color=2563eb&size=128&bold=true`}
                     alt="Avatar"
                     className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                  />
               </div>
            </div>

            {/* Nội dung chính */}
            <div className="pt-12 pb-8 px-6 text-center">
               <h2 className="text-2xl font-bold text-slate-800">
                  {userInfo.email?.split("@")[0]}{" "}
                  {/* Lấy tên trước @ làm tên hiển thị */}
               </h2>
               <p className="text-sm text-slate-500 mt-1">{userInfo.email}</p>

               {/* Thông báo từ Server */}
               {data?.message && (
                  <div className="mt-4 inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                     ✨ {data.message}
                  </div>
               )}

               {/* Grid thông tin chi tiết */}
               <div className="mt-8 grid gap-4 text-left">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 transition hover:bg-blue-50 hover:border-blue-100 group">
                     <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                           Email Address
                        </p>
                        <p className="text-slate-700 font-semibold text-sm truncate w-48">
                           {userInfo.email}
                        </p>
                     </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 transition hover:bg-purple-50 hover:border-purple-100 group">
                     <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-purple-600 group-hover:scale-110 transition">
                        <Fingerprint className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                           User ID
                        </p>
                        <p className="text-slate-700 font-mono text-sm">
                           {userInfo.userId || userInfo._id}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Nút Đăng xuất */}
               <button
                  onClick={handleLogout}
                  className="mt-8 w-full py-3 flex items-center justify-center gap-2 border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-200 rounded-xl font-semibold transition duration-200"
               >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất an toàn
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
