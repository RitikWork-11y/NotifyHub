import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/users.css";
import NotificationNavbar from "./NotificationNavbar";
import NotificationSidebar from "./NotificationSidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiSend,
  FiUser,
  FiMail,
  FiClock,
  FiUsers,
  FiMessageSquare,
  FiTrash2,
  FiCheck,
  FiCalendar,
} from "react-icons/fi";

const Users = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const transformedUsers = data.users.map((user) => ({
            ...user,
            avatar: `https://api.dicebear.com/7.x/micah/png?seed=${user.id}`,

            status: Number(user.get_started) === 1 ? "active" : "inactive",
          }));

          setUsers(transformedUsers);
          toast.success("Users fetched successfully!");
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Fetch user error:", error);
        toast.error("Something went wrong while fetching users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSendMessage = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const user_id = selectedUser.id;
    const message = messageContent;
    console.log("Sending message to:", user_id, "Message:", message);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/message-user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          message,
        }),
      });
      if (response.ok) {
        toast.success(`Message sent to ${selectedUser.name}!`);
        setMessageContent("");
        setShowMessageModal(false);
      }
    } catch (error) {
      console.error("Failed To Send Message", error);
      toast.error("Failde To Send Message");
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (user) =>
        filter === "all" ||
        (filter === "active" && user.status === "active") ||
        (filter === "inactive" && user.status === "inactive")
    );

  const notifyUser = async (id) => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const sender_name = storedUser?.name;
    const userId = id;
    console.log(token, sender_name, userId);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This User Will Receive a Notification From You!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/notify-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });

        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
          toast.success("User notified successfully!");
          Swal.fire("Sent!", "Notification Sent Successfully.", "success");
        } else {
          console.error("Failed to send notification", await response.text());
          toast.error("Failed to send notification!");
        }
      } catch (error) {
        console.error("Error Sending Notification", error);
        toast.error("An error occurred while sending notification.");
      }
    }
  };

  const bulkNotify = () => {
    if (selectedUsers.length === 0) {
      return toast.error("No users selected.");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "All User Receive a Notification From You!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success("User Notify successfully!");
        Swal.fire("Sended!", "Notification Sent Successfully.", "success");
      }
    });
  };

  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
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
          placeholder="Search users..."
        />

        {/* Cards */}
        <div className="notify-cards">
          <div className="notify-card">
            <div className="notify-card-header">
              <FiUsers />
              <h3>Total Users </h3>
            </div>
            <div className="notify-card-value">{users.length}</div>
            <div className="notify-card-footer">+2 from last week</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <FiClock />
              <h3>Active Users</h3>
            </div>
            <div className="notify-card-value">
              {users.filter((u) => u.status === "active").length}
            </div>
            <div className="notify-card-footer">+3 from last week</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <FiCheck /> <h3>Verified</h3>
            </div>
            <div className="notify-card-value">
              {users.filter((u) => u.get_started).length}
            </div>
            <div className="notify-card-footer">+1 from last week</div>
          </div>

          <div className="notify-card">
            <div className="notify-card-header">
              <FiCalendar /> <h3>New This Week</h3>
            </div>
            <div className="notify-card-value">
              {
                users.filter((u) => {
                  const userDate = new Date(u.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return userDate > weekAgo;
                }).length
              }
            </div>
            <div className="notify-card-footer">No change</div>
          </div>
        </div>

        {/* Filter + Actions */}
        <div className="notify-controls">
          <div className="notify-filter-controls">
            <label>Filter by:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Users</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="notify-action-controls">
            {selectedUsers.length > 0 ? (
              <button
                onClick={bulkNotify}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg shadow hover:bg-blue-500 transition duration-200"
              >
                <FiMessageSquare className="inline mr-1" />
                Notify All Selected
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="notify-list-container">
          {isLoading ? (
            <div className="notify-loading-state">
              <div className="notify-spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="notify-empty-state">
              <img src="/images/empty-users.svg" alt="No users" />
              <h3>No users found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <table className="notify-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Verification</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                      />
                    </td>
                    <td>
                      <div className="notify-content">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <h4>{user.name}</h4>
                            <p className="text-gray-500 text-sm">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`notify-type ${
                          user.status === "active"
                            ? "notify-type-system"
                            : "notify-type-alert"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      {user.get_started ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Not Active</span>
                      )}
                    </td>
                    <td>{formatDate(user.created_at)}</td>
                    <td>
                      <div className="notify-actions">
                        <button
                          className="notify-btn notify-btn-small"
                          onClick={() => handleSendMessage(user)}
                          disabled={user.status !== "active"}
                          style={{
                            cursor:
                              user.status !== "active"
                                ? "not-allowed"
                                : "pointer",
                            opacity: user.status !== "active" ? 0.5 : 1,
                          }}
                        >
                          <FiMessageSquare className="inline mr-1" />
                          Message
                        </button>

                        <button
                          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg shadow hover:bg-blue-500 transition duration-200"
                          onClick={() => notifyUser(user.id)}
                          disabled={user.status !== "active"}
                          style={{
                            cursor:
                              user.status !== "active"
                                ? "not-allowed"
                                : "pointer",
                            opacity: user.status !== "active" ? 0.5 : 1,
                          }}
                        >
                          <FiMessageSquare className="inline mr-2 text-white" />
                          Notify User
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

      {/* Message Modal */}
      {showMessageModal && (
        <div className="message-modal">
          <div className="message-modal-content">
            <div className="message-modal-header">
              <h3 className="message-modal-title">
                Send message to {selectedUser?.name}
              </h3>
              <button
                className="message-modal-close"
                onClick={() => setShowMessageModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleMessageSubmit}>
              <div className="message-modal-body">
                <textarea
                  className="message-modal-textarea"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={`Write your message to ${selectedUser?.name}...`}
                  required
                />
              </div>

              <div className="message-modal-footer">
                <button
                  type="button"
                  className="notify-btn notify-btn-secondary"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="notify-btn notify-btn-primary">
                  <FiSend className="inline mr-1" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
