import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiBell,
  FiBarChart2,
  FiMail,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const NotificationSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");

  const activePath = location.pathname;
  const fetchData = async () => {
    try {
      
      const response = await fetch("http://127.0.0.1:8000/api/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } 
  };

  useEffect(() => {
    fetchData();
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.success("User logged out successfully!");

          await Swal.fire({
            title: "Logged out!",
            text: "You have been logged out successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });

          navigate("/login");
        } else {
          toast.error("Logout failed. Please try again.");
        }
      } catch (error) {
        toast.error("Logout error. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div
      className={`notify-sidebar ${
        sidebarOpen ? "notify-sidebar-open" : "notify-sidebar-closed"
      }`}
    >
      <div className="notify-sidebar-header">
        <h2>
          <span className="text-2xl font-extrabold text-blue-700 tracking-wide hover:scale-105 transition-transform cursor-pointer">
            Notify<span className="text-gray-700">Hub</span>
          </span>
        </h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
      </div>

      <nav className="notify-sidebar-nav">
        <ul>
          <li className={activePath === "/dashboard" ? "notify-active" : ""}>
            <button onClick={() => navigate("/dashboard")}>
              <FiHome /> {sidebarOpen && "Blogs Dashboard"}
            </button>
          </li>

          <li className={activePath === "/notification" ? "notify-active" : ""}>
            <button onClick={() => navigate("/notification")}>
              <FiBell /> {sidebarOpen && "Notifications"}
              {unreadCount > 0 && (
                <span className="notify-unread-count">{unreadCount}</span>
              )}
            </button>
          </li>

          <li className={activePath === "/analytics" ? "notify-active" : ""}>
            <button onClick={() => navigate("/analytics")}>
              <FiBarChart2 /> {sidebarOpen && "Analytics"}
            </button>
          </li>

          <li className={activePath === "/messages" ? "notify-active" : ""}>
            <button onClick={() => navigate("/messages")}>
              <FiMail /> {sidebarOpen && "Messages"}
            </button>
          </li>

          <li className={activePath === "/users" ? "notify-active" : ""}>
            <button onClick={() => navigate("/users")}>
              <FiUsers /> {sidebarOpen && "Users"}
            </button>
          </li>
        </ul>
      </nav>

      <div className="notify-sidebar-footer">
        <button>
          <FiSettings /> {sidebarOpen && "Settings"}
        </button>
        <button onClick={handleLogout}>
          <FiLogOut /> {sidebarOpen && "Logout"}
        </button>
        <button>
          <FiHelpCircle /> {sidebarOpen && "Help"}
        </button>
      </div>
    </div>
  );
};

export default NotificationSidebar;
