import { useEffect, useState } from "react";
import Sidebar from "../modules/managers/TeamLeadSidebar";
import "../styles/layout.css";
import "../styles/EmployeeDashboard.css";
import { getEmployees } from "../api/employeeService";
import { getTasks } from "../api/taskService";

const ManagerDashboard = () => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [empRes, taskRes] = await Promise.all([getEmployees(), getTasks()]);
      const employees = empRes.data || [];
      const tasks = taskRes.data || [];

      setEmployeesCount(employees.length);
      setTasksCount(tasks.length);

      const pending = tasks.filter((t) => String(t.status).toLowerCase() === "pending").length;
      const approved = tasks.filter((t) => String(t.status).toLowerCase() === "approved").length;

      setPendingCount(pending);
      setApprovedCount(approved);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    { title: "Total Employees", value: employeesCount },
    { title: "Total Tasks", value: tasksCount },
    { title: "Pending Approvals", value: pendingCount },
    { title: "Approved Tasks", value: approvedCount },
  ];

  return (
    <div className="layout">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT MAIN CONTENT */}
      <div className="main">
        {/* You can add a Navbar here if you have one for Managers, or just the content */}

        <h2 className="welcome-text">Manager Dashboard Overview</h2>

        <div className="cards">
          {stats.map((item, index) => (
            <div className="card" key={index}>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-value">{loading ? "—" : item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;