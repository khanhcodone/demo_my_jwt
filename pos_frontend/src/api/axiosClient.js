import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // Mở nếu cần check hạn token ở client

// 1. CẤU HÌNH URL TỰ ĐỘNG (Localhost hoặc Server)
const BACKEND_URL = "https://my-backend-api-1mvw.onrender.com";

console.log("🔗 API URL:", BACKEND_URL); // Log để kiểm tra đang chạy link nào

const axiosClient = axios.create({
   baseURL: BACKEND_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// Biến lưu Access Token trong RAM
let currentAccessToken = null;

export const setAccessToken = (token) => {
   currentAccessToken = token;
};
export const getAccessToken = () => currentAccessToken;

// =================================================================
// 2. REQUEST INTERCEPTOR (Gửi đi) - ĐÃ MỞ COMMENT
// Tự động chèn Token vào Header
// =================================================================
axiosClient.interceptors.request.use(
   async (config) => {
      // Không đính token nếu đang gọi API login hoặc refresh để tránh lỗi vòng lặp
      if (
         config.url.includes("/auth/login") ||
         config.url.includes("/auth/refresh")
      ) {
         return config;
      }

      // Nếu có token trong bộ nhớ, kẹp nó vào
      if (currentAccessToken) {
         config.headers.Authorization = `Bearer ${currentAccessToken}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

// =================================================================
// 3. RESPONSE INTERCEPTOR (Nhận về)
// Xử lý khi Token hết hạn (Lỗi 401)
// =================================================================
axiosClient.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      // Chỉ xử lý nếu lỗi là 401 và chưa từng thử lại (retry)
      if (error.response?.status === 401 && !originalRequest._retry) {
         // Nếu đang gọi Login mà lỗi thì return luôn (sai pass), không refresh
         if (originalRequest.url.includes("/auth/login")) {
            return Promise.reject(error);
         }

         console.log("⚡ Phát hiện lỗi 401! Đang thử Refresh Token...");
         originalRequest._retry = true;

         try {
            const refreshToken = localStorage.getItem("refresh_token");

            if (!refreshToken) {
               throw new Error("Không tìm thấy Refresh Token trong kho");
            }

            // Gọi API Refresh (Dùng biến BACKEND_URL để tự động đổi link)
            const result = await axios.post(`${BACKEND_URL}/auth/refresh`, {
               refresh_token: refreshToken,
            });

            const newAccessToken = result.data.access_token;
            console.log("✅ Refresh thành công! Token mới đã về.");

            // 1. Lưu token mới vào RAM
            setAccessToken(newAccessToken);

            // 2. Gán token mới vào header của request cũ bị lỗi
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // 3. Gọi lại request cũ
            return axiosClient(originalRequest);
         } catch (refreshError) {
            console.error(
               "💀 Refresh thất bại hoặc hết hạn -> Logout bắt buộc."
            );

            // Xóa sạch dữ liệu
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_info");
            setAccessToken(null);

            // Chuyển về trang login
            window.location.href = "/login";
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default axiosClient;
