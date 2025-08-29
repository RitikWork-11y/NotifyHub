import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../assets/css/Login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, password_confirmation } = formData;

    if (!name || !email || !password || !password_confirmation) {
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

    if (password !== password_confirmation) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        window.location.href = "/login";
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-background">
          <img
            src="https://img.freepik.com/premium-vector/tablet-login-concept-illustration_114360-7963.jpg"
            alt="register Background"
          />
        </div>

        <div className="login-box">
          <h1 className="login-title">Register Here!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="login-input"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="login-input"
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
            <div className="input-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                placeholder="Confirm your password"
                className="login-input"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="login-links">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login here
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

export default Register;
