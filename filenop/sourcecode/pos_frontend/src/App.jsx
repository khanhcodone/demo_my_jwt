import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
   return (
      <BrowserRouter>
         {/* Wrapper chính: w-full để full màn hình, min-h-screen để cao hết cỡ */}
         <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            {/* Header luôn nằm trên cùng */}
            <Header />

            {/* Phần thân trang web */}
            <main className="flex-1 w-full">
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<SignUpPage />} />
               </Routes>
            </main>
         </div>
      </BrowserRouter>
   );
}

export default App;
