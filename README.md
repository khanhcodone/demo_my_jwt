# 🚀 Secure Authentication & User Management System

**(Hệ thống Xác thực & Quản lý người dùng Fullstack)**

![React](https://img.shields.io/badge/Frontend-ReactJS-blue?style=for-the-badge&logo=react)
![NestJS](https://img.shields.io/badge/Backend-NestJS-red?style=for-the-badge&logo=nestjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)

> Dự án Fullstack hoàn chỉnh mô phỏng quy trình xác thực (Authentication) bảo mật cao theo tiêu chuẩn công nghiệp, sử dụng cơ chế **JWT (Access Token + Refresh Token)**.

---

## 📋 Mục lục

1. [Giới thiệu dự án](#-giới-thiệu-dự-án)
2. [Tính năng nổi bật](#-tính-năng-nổi-bật)
3. [Kiến trúc & Công nghệ](#-kiến-trúc--công-nghệ)
4. [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
5. [Yêu cầu tiên quyết](#-yêu-cầu-tiên-quyết)
6. [Hướng dẫn cài đặt & Chạy (Local)](#-hướng-dẫn-cài-đặt--chạy-local)
7. [Biến môi trường (.env)](#-cấu-hình-biến-môi-trường)
8. [API Documentation](#-api-documentation)

---

## 📖 Giới thiệu dự án

Đây không chỉ là một form đăng ký đơn giản. Dự án này giải quyết bài toán khó nhất trong lập trình Web: **Quản lý phiên đăng nhập an toàn**.

Hệ thống hoạt động với luồng dữ liệu khép kín:

1. **Frontend:** Giao diện ReactJS hiện đại, quản lý state server với React Query, xử lý API với Axios Interceptor.
2. **Backend:** NestJS API mạnh mẽ, validation chặt chẽ, bảo mật với Guards và Strategies.
3. **Database:** Lưu trữ phi cấu trúc với MongoDB.

---

## ✨ Tính năng nổi bật

### 🔐 Authentication (Bảo mật)

-  **Đăng ký & Đăng nhập:** Validate dữ liệu đầu vào chặt chẽ (Email, Password mạnh).
-  **JWT Standard:** Sử dụng cặp `Access Token` (lưu RAM - ngắn hạn) và `Refresh Token` (lưu LocalStorage - dài hạn).
-  **Auto Refresh Token:** Khi Access Token hết hạn, Axios Interceptor tự động bắt lỗi 401 và gọi API lấy token mới mà không làm gián đoạn trải nghiệm người dùng.
-  **Secure Logout:** Cơ chế đăng xuất sạch sẽ, xóa token ở cả Client và State.

### 💻 Frontend Experience (Trải nghiệm người dùng)

-  **Protected Routes:** Ngăn chặn truy cập trái phép vào các trang nội bộ (Profile/Dashboard).
-  **Modern UI:** Thiết kế với Tailwind CSS, Responsive trên Mobile/Desktop.
-  **Glassmorphism Effect:** Hiệu ứng giao diện kính mờ, background động đẹp mắt.
-  **Smart State:** Sử dụng `TanStack Query` để cache dữ liệu và quản lý trạng thái tải (Loading/Error).

### ⚙️ Backend Power (Hiệu năng)

-  **Validation Pipe:** Kiểm soát dữ liệu đầu vào bằng `class-validator` (DTO).
-  **CORS Configuration:** Cấu hình bảo mật chia sẻ tài nguyên (hỗ trợ deploy tách biệt Front/Back).
-  **Error Handling:** Trả về thông báo lỗi chuẩn hóa, dễ debug.

---

## 🛠 Kiến trúc & Công nghệ

### Frontend (`pos_frontend`)

-  **Core:** ReactJS (Vite Build Tool)
-  **State Management:** React Query (TanStack Query v5)
-  **Routing:** React Router DOM v6
-  **HTTP Client:** Axios (Custom Instance & Interceptors)
-  **Forms:** React Hook Form
-  **UI/UX:** Tailwind CSS, Lucide React Icons

### Backend (`pos_backend`)

-  **Core:** NestJS Framework
-  **Database:** MongoDB (Mongoose ODM)
-  **Security:** Passport-JWT, Bcrypt
-  **API Docs:** Swagger (Optional)

---

## 📂 Cấu trúc thư mục

```bash
Project-Fullstack/
├── pos_backend/          # Source code Backend (NestJS)
│   ├── src/
│   │   ├── auth/         # Module xử lý Login/Register/Refresh
│   │   ├── users/        # Module quản lý User Schema
│   │   ├── app.module.ts # Root Module
│   │   └── main.ts       # Entry point (CORS config)
│   └── .env              # Biến môi trường Backend
│
└── pos_frontend/         # Source code Frontend (ReactJS)
    ├── src/
    │   ├── api/          # Cấu hình Axios & Interceptors
    │   ├── components/   # Header, ProtectedRoute...
    │   ├── context/      # AuthContext (Global State)
    │   ├── pages/        # Login, Register, Home, Profile
    │   └── App.jsx       # Routing config
    └── .env              # Biến môi trường Frontend
```

### ⚙️ Yêu cầu tiên quyết

Node.js: v18 trở lên.

MongoDB: Đã cài đặt MongoDB Community hoặc có tài khoản MongoDB Atlas.

Git: Để quản lý source code.

### 📥 Hướng dẫn cài đặt & Chạy (Local)

Bạn cần mở 2 cửa sổ Terminal riêng biệt.

1. Thiết lập Backend (Server)

```bash
# 1. Di chuyển vào thư mục backend
cd pos_backend

# 2. Cài đặt thư viện
npm install

# 3. Tạo file .env và cấu hình (Xem mục Biến môi trường bên dưới)

# 4. Chạy server (Mặc định cổng 3000)
npm run start:dev
```

2. Thiết lập Frontend (Client)

```bash
# 1. Di chuyển vào thư mục frontend
cd pos_frontend

# 2. Cài đặt thư viện
npm install

# 3. Tạo file .env và cấu hình API URL (Xem mục Biến môi trường bên dưới)

# 4. Chạy ứng dụng
npm run dev
```

🔧 Cấu hình Biến môi trường

Backend (pos_backend/.env)
Tạo file .env trong thư mục pos_backend:

```bash
# Kết nối MongoDB (Local hoặc Atlas)
MONGO_URI=mongodb://127.0.0.1:27017/user_db
# Hoặc: MONGO_URI=mongodb+srv://user:pass@cluster...

# Secret Key để mã hóa Token (Tùy chọn chuỗi bất kỳ)
JWT_SECRET=Sieu_Bi_Mat_Khong_Duoc_Tiet_Lo
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=Bi_Mat_Refresh_Token
JWT_REFRESH_EXPIRATION=7d
```

### 🌐 Deployment (Demo)

Dự án đã được deploy công khai tại:

Frontend (Vercel): https://demo-my-jwt.vercel.app

Backend (Render): https://demo-my-jwt.onrender.com
