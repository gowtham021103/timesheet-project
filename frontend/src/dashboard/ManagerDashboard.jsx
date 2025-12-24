import { useEffect, useState } from "react";
import Sidebar from "../modules/managers/TeamLeadSidebar";
import "../styles/dashboard.css";
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
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">

        <h2 className="page-heading">Manager Dashboard Overview</h2>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <h3 className="stat-value">{loading ? "—" : item.value}</h3>
              <p className="stat-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;