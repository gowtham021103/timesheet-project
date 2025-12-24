import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdClose } from "react-icons/md";

const notifications = [
  { id: 1, message: "John Doe has marked their timesheet", time: "5 mins ago", type: "info" },
  { id: 2, message: "Leave request approved for Raihana", time: "1 hour ago", type: "success" },
  { id: 3, message: "New attendance report available", time: "2 hours ago", type: "info" },
  { id: 4, message: "System maintenance scheduled for tonight", time: "3 hours ago", type: "warning" },
];

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="navbar">
      <h3>Welcome Employee</h3>

      <div className="navbar-actions">
        
        {/* Notification Icon */}
        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoIosNotifications size={30} />
            <span className="notification-badge">4</span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="notification-menu">
              <div className="notification-header">
                <h4>Notifications</h4>
                <button
                  className="close-btn"
                  onClick={() => setShowNotifications(false)}
                >
                  <MdClose size={20} />
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="notification-footer">
                <a href="#" className="view-all-link">View All Notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <a href="#" className="profile-link">
          <FaUserCircle size={40} className="navbar-icons" />
        </a>

      </div>
    </div>
  );
}
