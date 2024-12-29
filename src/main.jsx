import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Nhập các thành phần cần thiết
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import ErrorPage from "./ErrorPage"; // Nếu có trang lỗi, đảm bảo import đúng cách

// Cấu hình router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
    // errorElement: <ErrorPage />, // Kích hoạt trang lỗi nếu cần
  },
]);

// Kết xuất ứng dụng React
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
