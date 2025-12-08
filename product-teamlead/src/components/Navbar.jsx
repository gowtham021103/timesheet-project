import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="navbar">
      <h3>TeamLead Dashboard</h3>

      <div className="nav-icons">
        <IoIosNotifications size={32} className="icon" />
        <FaUserCircle size={40} className="icon" />
      </div>
    </div>
  );
}
