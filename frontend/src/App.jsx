import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Notification from "./components/userPages/Notification";
import Dashboard from "./components/userPages/Dashboard";
import Analytics from "./components/userPages/Analytics";
import Messages from "./components/userPages/Messages";
import Users from "./components/userPages/Users";

function App() {
  const location = useLocation();

  const fullLayoutRoutes = [
    "/notification",
    "/dashboard",
    "/analytics",
    "/messages",
    "/users",
  ];

  const isFullLayout = fullLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isFullLayout && <Navbar />}

      {isFullLayout ? (
        <Routes>
          <Route path="/notification" element={<Notification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      ) : (
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
