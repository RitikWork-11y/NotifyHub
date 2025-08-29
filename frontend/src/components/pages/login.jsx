import React from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        window.location.href = "/dashboard";
      } else {
        toast.error("Invalid email or password.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Login successful!");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-background">
          <img
            src="https://img.freepik.com/premium-vector/register-access-login-password-internet-online-website-concept-flat-illustration_385073-108.jpg"
            alt="Login Background"
          />
        </div>

        <div className="login-box">
          <h1 className="login-title">Login Here!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="login-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="login-input"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="login-links">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="login-link">
                Register here
              </Link>
            </p>
            <p>
              Forgot your password?{" "}
              <Link to="#" className="login-link">
                Reset it
              </Link>
            </p>
            <p>
              <Link to="/" className="login-link">
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
