import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export default function Header() {
  const { user, logout, cartCount, theme, toggleTheme } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to={user ? "/products" : "/login"} aria-label="The Good Store home">
          <span className="brand-mark">g.</span>
          <span>the good store</span>
        </Link>

        {user && (
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/products">Shop all</NavLink>
            <NavLink to="/cart" className="cart-link">
              <BagIcon />
              <span>Bag</span>
              <span className="cart-count">{cartCount}</span>
            </NavLink>
          </nav>
        )}

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          {user ? (
            <button className="text-button sign-out" type="button" onClick={handleLogout}>
              Sign out
            </button>
          ) : (
            <Link className="text-button sign-out" to="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
