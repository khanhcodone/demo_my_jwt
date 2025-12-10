# 🚀 User Registration System (Fullstack Project)

Dự án Hệ thống Đăng ký và Quản lý người dùng hoàn chỉnh. Dự án bao gồm Backend xây dựng bằng **NestJS** và Frontend xây dựng bằng **ReactJS**.

![Status](https://img.shields.io/badge/Status-Completed-success) ![Node](https://img.shields.io/badge/Node.js-v18+-green)

## 📋 Mục lục

1. [Giới thiệu](#-giới-thiệu)
2. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
3. [Cấu trúc dự án](#-cấu-trúc-dự-án)
4. [Yêu cầu cài đặt](#-yêu-cầu-cài-đặt)
5. [Hướng dẫn cài đặt & Chạy (Local)](#-hướng-dẫn-cài-đặt--chạy-local)
6. [API Endpoints](#-api-endpoints)
7. [Tác giả](#-tác-giả)

---

## 📖 Giới thiệu

Đây là bài tập/đồ án (IA03) với mục tiêu xây dựng quy trình đăng ký người dùng Fullstack:

-  Người dùng nhập thông tin (Email, Password) từ giao diện React.
-  Dữ liệu được Validate (kiểm tra) ở cả Frontend và Backend.
-  Backend mã hóa mật khẩu và lưu trữ vào MongoDB.
-  Giao diện phản hồi trạng thái (Thành công/Thất bại) theo thời gian thực.

---

## 🛠 Công nghệ sử dụng

### Backend (`pos_backend`)

-  **Framework:** NestJS (Node.js)
-  **Database:** MongoDB
-  **ORM:** Mongoose
-  **Security:** Bcrypt (Hashing Password), CORS enabled
-  **Validation:** class-validator, class-transformer

### Frontend (`pos_frontend`)

-  **Framework:** ReactJS (Vite)
-  **Styling:** Tailwind CSS (Responsive, Modern UI)
-  **State/API Management:** React Query (Tanstack Query)
-  **Form Handling:** React Hook Form
-  **HTTP Client:** Axios
-  **Icons:** Lucide React, FontAwesome

## ⚙️ Yêu cầu cài đặt

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:

1. **Node.js**: Phiên bản 18 trở lên (Khuyên dùng v20 LTS).
2. **Git**: Để tải dự án về.
3. **MongoDB**:
   -  Cách 1: Cài MongoDB Community Server trên máy.
   -  Cách 2: Có tài khoản MongoDB Atlas (Cloud).

---

## 📥 Hướng dẫn cài đặt & Chạy (Local)

Để chạy dự án, bạn cần mở **2 cửa sổ Terminal** riêng biệt (một cho Backend, một cho Frontend).

### Bước 1: Cài đặt & Chạy Backend (Server)

Di chuyển vào thư mục backend và cài đặt các thư viện:

```bash
cd pos_backend
npm install
```

Quan trọng: Cấu hình biến môi trường.

Tạo một file tên là .env ngay tại thư mục pos_backend.

Dán nội dung sau vào file .env:

```bash
# Nếu dùng MongoDB cài trên máy (Localhost):
MONGO_URI=mongodb://127.0.0.1:27017/user_db

# Nếu dùng MongoDB Atlas (Cloud):
# MONGO_URI=mongodb+srv://user:pass@cluster...
```

Sau đó khởi động server:

```bash
npm run start:dev
```

### Bước 2: Mở frontend:

Di chuyển vào thư mục frontend:

```bash:
cd pos_frontend
npm install
npm run dev
```
