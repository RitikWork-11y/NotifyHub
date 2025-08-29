import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/notification.css";
import toast from "react-hot-toast";
import NotificationSidebar from "./NotificationSidebar";
import NotificationNavbar from "./NotificationNavbar";
import Swal from "sweetalert2";

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("notifications");
  const [getStartedClicked, setGetStartedClicked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        const processed = data.notifications.map((n) => ({
          id: n.id,
          title: n.data?.title || "No title",
          message: n.data?.message || "",
          type: n.data?.type || "info",
          isRead: n.read_at !== null,
          created_at: n.created_at,
        }));

        setNotifications(processed);
      } catch (error) {
        toast.error("Failed to fetch notifications.");
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGetStartedStatus = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user-status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setGetStartedClicked(data.get_started);
      } catch (err) {
        console.error("Error fetching user status", err);
      }
    };
    
    fetchData();
    fetchGetStartedStatus();
  }, [navigate]);

  const handleGetStarted = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/system-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Welcome notification sent!");
        setGetStartedClicked(true);
      } else {
        toast.error(result.message || "Already clicked");
      }
    } catch (err) {
      toast.error("Error sending system notification");
      console.error(err);
    }
  };

  const filteredNotifications = notifications
    .filter(
      (n) =>
        filter === "all" ||
        (filter === "unread" ? !n.isRead : n.type === filter)
    )
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const markAsRead = async (id) => {
    const notification_id = id;
    console.log("Marking as read:", notification_id);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/notifications/read",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ notification_id }),
        }
      );

      if (response.ok) {
        toast.success("Notification marked as read successfully!");
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to mark as read.");
      }
    } catch (error) {
      toast.error("Failed to mark notification as read.");
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = () => {
    Swal.fire({
      title: "Mark all as read?",
      text: "This will mark all unread notifications as read.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark unread as read!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            "http://127.0.0.1:8000/api/notifications/mark-all-read",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (res.ok) {
            setNotifications((prev) =>
              prev.map((n) => ({ ...n, isRead: true }))
            );
            toast.success("All notifications marked as read!");
          } else {
            toast.error("Failed to mark all as read.");
          }
        } catch (error) {
          console.error("Error marking all as read:", error);
          toast.error("Server error while marking all as read.");
        }
      }
    });
  };

  const deleteNotification = async (id) => {
    const notification_id = id;
    console.log("Deleting notification:", notification_id);

    Swal.fire({
      title: "Are you sure?",
      text: "This notification will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/delete-notification",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ notification_id }),
            }
          );

          if (response.ok) {
            setNotifications((prev) =>
              prev.filter((n) => n.id !== notification_id)
            );
            toast.success("Notification deleted successfully!");
            Swal.fire(
              "Deleted!",
              "Your notification has been deleted.",
              "success"
            );
          } else {
            const data = await response.json();
            toast.error(data.message || "Failed to delete notification.");
          }
        } catch (error) {
          console.error("Error deleting notification:", error);
          toast.error("Something went wrong. Please try again.");
        }
      }
    });
  };

  const bulkDelete = async () => {
    if (selectedNotifications.length === 0) {
      return toast.error("No notifications selected.");
    }

    Swal.fire({
      title: "Delete selected notifications?",
      text: "This will permanently delete selected notifications.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            "http://127.0.0.1:8000/api/notifications/delete-multiple",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ ids: selectedNotifications }),
            }
          );

          if (res.ok) {
            setNotifications((prev) =>
              prev.filter((n) => !selectedNotifications.includes(n.id))
            );
            setSelectedNotifications([]);
            toast.success("Selected notifications deleted.");
          } else {
            toast.error("Failed to delete notifications.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error deleting notifications.");
        }
      }
    });
  };

  const toggleSelect = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
      console.log(
        "Selected all notifications:",
        filteredNotifications.map((n) => n.id)
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid date"
      : date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="notify-dashboard">
      <NotificationSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="notify-main-content">
        <NotificationNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Cards */}
        <div className="notify-cards">
          <div className="notify-card">
            <div className="notify-card-header">
              <h3>Total Notifications</h3>
            </div>
            <div className="notify-card-value">{notifications.length}</div>
            <div className="notify-card-footer">+2 from yesterday</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <h3>Unread</h3>
            </div>
            <div className="notify-card-value">
              {notifications.filter((n) => !n.isRead).length}
            </div>
            <div className="notify-card-footer">-1 from yesterday</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <h3>System Alerts</h3>
            </div>
            <div className="notify-card-value">
              {notifications.filter((n) => n.type === "system").length}
            </div>
            <div className="notify-card-footer">+3 from yesterday</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <h3>Messages</h3>
            </div>
            <div className="notify-card-value">
              {notifications.filter((n) => n.type === "message").length}
            </div>
            <div className="notify-card-footer">No change</div>
          </div>
          <div style={{ margin: "20px 0" }}>
            {!getStartedClicked ? (
              <button
                onClick={handleGetStarted}
                className="notify-btn notify-btn-primary"
              >
                Click To Get Messages.
              </button>
            ) : (
              <p className="text-green-600 font-semibold">
                You’ve already started!
              </p>
            )}
          </div>
        </div>

        {/* Filter + Actions */}
        <div className="notify-controls">
          <div className="notify-filter-controls">
            <label>Filter by:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="system">System</option>
              <option value="message">Messages</option>
              <option value="alert">Alerts</option>
              <option value="welcome">Welcome</option>
            </select>
          </div>

          <div className="notify-action-controls">
            {selectedNotifications.length > 0 ? (
              <>
                <button
                  className="notify-btn notify-btn-primary"
                  onClick={() => {
                    selectedNotifications.forEach(markAsRead);
                    setSelectedNotifications([]);
                  }}
                >
                  Mark as Read
                </button>
                <button
                  onClick={bulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </>
            ) : (
              <button
                className="notify-btn notify-btn-primary"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        <div className="notify-list-container">
          {isLoading ? (
            <div className="notify-loading-state">
              <div className="notify-spinner"></div>
              <p>Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="notify-empty-state">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/014/814/039/small_2x/a-well-designed-flat-icon-of-no-notification-yet-vector.jpg"
                alt="No notifications"
              />
              <h3>No notifications found</h3>
              <p>Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <table className="notify-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedNotifications.length ===
                          filteredNotifications.length &&
                        filteredNotifications.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Notification</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className={!notification.isRead ? "notify-unread" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id
                        )}
                        onChange={() => toggleSelect(notification.id)}
                      />
                    </td>
                    <td>
                      <div className="notify-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`notify-type notify-type-${notification.type}`}
                      >
                        {notification.type}
                      </span>
                    </td>
                    <td>{formatDate(notification.created_at)}</td>
                    <td>
                      <div className="notify-actions">
                        {!notification.isRead && (
                          <button
                            className="notify-btn notify-btn-small"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Read
                          </button>
                        )}
                        <button
                          className="notify-btn notify-btn-small notify-btn-danger"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
