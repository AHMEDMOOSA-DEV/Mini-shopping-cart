import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { setUser } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegister && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setUser({ name: name.trim() || email.split("@")[0], email: email.trim() });
    navigate(location.state?.from?.pathname || "/products", { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-side">
          <span className="auth-overline">A little more good</span>
          <h1>Good things<br />start here.</h1>
          <p>Everyday pieces, thoughtfully picked. Make yourself at home.</p>
          <div className="auth-decoration" aria-hidden="true">
            <span>✳</span><span>✳</span><span>✳</span>
          </div>
          <span className="auth-note">A shop for the things you’ll love.</span>
        </div>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <p className="eyebrow">{isRegister ? "YOUR NEXT FAVORITE THING" : "WELCOME BACK"}</p>
            <h2>{isRegister ? "Create an account" : "Sign in to your account"}</h2>
            <p>{isRegister ? "Join us for the good stuff." : "We saved you a good spot."}</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Your name
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Jamie Parker"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
            )}
            <label>
              Email address
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                placeholder="At least 6 characters"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-dark auth-submit" type="submit">
              {isRegister ? "Create account" : "Sign in"} <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="auth-switch">
            {isRegister ? "Already have an account?" : "New around here?"}{" "}
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <p className="demo-note">Demo store · any valid email and password will work</p>
        </div>
      </section>
    </main>
  );
}
