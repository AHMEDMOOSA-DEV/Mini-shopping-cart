import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import { GuestRoute, ProtectedRoute } from "./components/ProtectedRoute.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import { useShop } from "./context/ShopContext.jsx";

export default function App() {
  const { user } = useShop();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/products" : "/login"} replace />} />
        <Route path="/login" element={<GuestRoute><AuthPage mode="login" /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><AuthPage mode="register" /></GuestRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
