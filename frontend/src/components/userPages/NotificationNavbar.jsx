import React from "react";
import { FiSearch } from "react-icons/fi";

const NotificationNavbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="notify-content-header">
      <h1>Notifications</h1>
      <div className="notify-header-actions">
        <div className="notify-search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="notify-user-profile">
          <img
            src="https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-173524.jpg"
            alt="User"
          />
          <span className="notify-user-name">
            {JSON.parse(localStorage.getItem("user"))?.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default NotificationNavbar;
