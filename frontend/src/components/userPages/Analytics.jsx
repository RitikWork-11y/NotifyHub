import React from 'react'
import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/css/notification.css';
import NotificationNavbar from './NotificationNavbar';
import NotificationSidebar from './NotificationSidebar';

const Analytics = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("notifications");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Analytics</h1>
          <p className="text-gray-600">
            Welcome to your analytics page. You can customize this section with
            charts, graphs, or other visualizations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Analytics;

