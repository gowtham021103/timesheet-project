import { FaProjectDiagram, FaTasks, FaClipboardCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function TeamLeadStats() {
    return (
        <div className="cards">
            <div className="card">
                <FaProjectDiagram size={50} style={{ color: '#006CA3' }} />
                <h3>Active Projects</h3>
                <p>5</p>
            </div>
            <div className="card">
                <FaUsers size={60} style={{ color: '#006CA3' }} />
                <h3>Team Members</h3>
                <p>12</p>
            </div>
            <div className="card">
                <FaTasks size={60} style={{ color: '#006CA3' }} />
                <h3>Pending Tasks</h3>
                <p>8</p>
            </div>
            <div className="card">
                <FaClipboardCheck size={60} style={{ color: '#006CA3' }} />
                <h3>Pending Timesheets</h3>
                <p>3</p>
            </div>
        </div>
    );
}
