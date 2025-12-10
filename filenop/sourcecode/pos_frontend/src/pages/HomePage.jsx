import { Link } from "react-router-dom";

const HomePage = () => {
   return (
      <div className="text-center py-20">
         <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
            Chào mừng đến với Hệ thống!
         </h1>
         <p className="text-gray-600 text-lg mb-8">
            Dự án Fullstack NestJS + ReactJS + MongoDB
         </p>

         <div className="flex justify-center gap-4">
            <Link
               to="/register"
               className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md"
            >
               Bắt đầu ngay (Đăng ký)
            </Link>
            <Link
               to="/login"
               className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 shadow-sm"
            >
               Đăng nhập
            </Link>
         </div>
      </div>
   );
};

export default HomePage;
