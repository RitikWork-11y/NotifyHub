import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationNavbar from "./NotificationNavbar";
import NotificationSidebar from "./NotificationSidebar";
import toast from "react-hot-toast";
import echo from "../../echo";
import "../../assets/css/message-styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Messages = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const token = localStorage.getItem("token");
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    setLoadingUsers(true);
    fetch("http://localhost:8000/api/get-user", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedUsers = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: `https://api.dicebear.com/7.x/micah/png?seed=${user.id}`,
          lastMessage: "",
        }));
        setUsers(formattedUsers);
      })
      .catch(console.error)
      .finally(() => setLoadingUsers(false));
  }, [token]);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    fetch("http://localhost:8000/api/user-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ selected_user_id: selectedUser.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) {
          const apiMessages = data.messages.map((msg) => ({
            id: msg.id,
            sender: msg.sender_id === loggedInUserId ? "me" : "received",
            text: msg.message,
            time: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setMessages(apiMessages);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingMessages(false));
  }, [selectedUser, token, loggedInUserId]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!echo || !loggedInUserId) return;

    const channel = echo.private(`chat.${loggedInUserId}`);

    channel.listen("MessageSent", (e) => {
      if (
        selectedUser &&
        (e.sender_id === selectedUser.id || e.sender_id === loggedInUserId)
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: e.id,
            sender: e.sender_id === loggedInUserId ? "me" : "received",
            text: e.message,
            time: new Date(e.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    });

    return () => {
      echo.leave(`chat.${loggedInUserId}`);
    };
  }, [loggedInUserId, selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    if (!selectedUser) {
      console.error("No user selected");
      return;
    }

    const messageText = newMessage.trim();
    const tempId = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        sender: "me",
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/message-user", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: selectedUser.id,
          message: messageText,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to send message!");
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      } else {
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message!");
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    }
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
        <div className="messages-container">
          <div
            className={`messages-users-card ${
              selectedUser ? "messages-users-card-collapsed" : ""
            }`}
          >
            <div className="messages-users-header">
              <h2>Conversations</h2>
              <div className="messages-search">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <div className="messages-users-list">
              {loadingUsers ? (
                <p className="loading-text">Loading users...</p>
              ) : (
                users
                  .filter((user) =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <div
                      key={user.id}
                      className={`messages-user-item ${
                        selectedUser?.id === user.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="messages-user-avatar"
                      />
                      <div className="messages-user-info">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p className="messages-user-lastmsg">
                          {user.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {selectedUser ? (
            <div className="messages-chat-card">
              <div className="messages-chat-header">
                <button
                  className="messages-back-button"
                  onClick={() => setSelectedUser(null)}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="messages-chat-avatar"
                />
                <div className="messages-chat-user">
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="messages-chat-actions">
                  <button>
                    <i className="fas fa-phone"></i>
                  </button>
                  <button>
                    <i className="fas fa-video"></i>
                  </button>
                  <button>
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>
              <div className="messages-chat-body">
                {loadingMessages ? (
                  <p className="loading-text">Loading messages...</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`messages-message ${
                        message.sender === "me" ? "sent" : "received"
                      }`}
                    >
                      <div className="messages-message-content">
                        <p>{message.text}</p>
                        <span className="messages-message-time">
                          {message.time}
                        </span>
                      </div>
                      
                    </div>
                  ))
                )}
             
              </div>
              <form
                className="messages-chat-footer"
                onSubmit={handleSendMessage}
              >
                <button type="button" className="messages-attach-button">
                  <i className="fas fa-paperclip"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          ) : (
            <div className="messages-welcome-card">
              <div className="messages-welcome-content">
                <i className="fas fa-comments messages-welcome-icon"></i>
                <h2>Select a conversation</h2>
                <p>Choose an existing conversation or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
