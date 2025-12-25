import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useAuth } from "../auth/AuthProvider";
import { getNotifications, markNotificationAsRead } from "../api/notificationService";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      const sorted = (res.data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotifications(sorted);
      setUnreadCount(sorted.filter(n => !n.is_read).length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Optional: poll every 1 minute
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleMarkRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (notif) => {
    // mark as read
    await handleMarkRead(notif.id, notif.is_read);

    // if task assignment, navigate to timesheet form with taskId
    if (notif.related_task) {
      window.location.href = `/timesheets/new?taskId=${notif.related_task}`;
    }
  };

  return (
    <div className="navbar">
      <h3>Welcome, {user?.username}</h3>

      <div className="navbar-actions">

        {/* Notification Icon */}
        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoIosNotifications size={30} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
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
                {notifications.length === 0 ? (
                  <p style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notification-item ${notif.notification_type || 'info'} ${!notif.is_read ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notif)}
                      style={{ cursor: 'pointer', background: notif.is_read ? 'transparent' : '#f0f9ff' }}
                    >
                      <div className={`notification-dot ${!notif.is_read ? 'active' : ''}`} style={{ background: !notif.is_read ? '#3b82f6' : '#cbd5e1' }}></div>
                      <div className="notification-content">
                        <p className="notification-message" style={{ fontWeight: !notif.is_read ? 600 : 400 }}>{notif.message}</p>
                        <span className="notification-time">{new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))
                )}
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
