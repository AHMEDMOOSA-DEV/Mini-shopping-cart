import { Navigate, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

export function ProtectedRoute({ children }) {
  const { user } = useShop();
  const location = useLocation();

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export function GuestRoute({ children }) {
  const { user } = useShop();
  return user ? <Navigate to="/products" replace /> : children;
}
