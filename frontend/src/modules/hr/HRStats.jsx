import { FaUserTie, FaUsers, FaClock } from "react-icons/fa";
import { MdEventBusy } from "react-icons/md";

export default function HRStats() {
    return (
        <div className="cards">
            <div className="card">
                <FaUsers size={50} style={{ color: '#006CA3' }} />
                <h3>Total Employees</h3>
                <p>42</p>
            </div>
            <div className="card">
                <FaUserTie size={60} style={{ color: '#006CA3' }} />
                <h3>Active Managers</h3>
                <p>8</p>
            </div>
            <div className="card">
                <MdEventBusy size={60} style={{ color: '#006CA3' }} />
                <h3>On Leave</h3>
                <p>4</p>
            </div>
            <div className="card">
                <FaClock size={60} style={{ color: '#006CA3' }} />
                <h3>Pending Timesheets</h3>
                <p>12</p>
            </div>
        </div>
    );
}
