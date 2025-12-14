import "./manager.css";

const ManagerDashboard = () => {
  // Temporary static data (will be replaced by API)
  const stats = [
    { title: "Total Employees", value: 12 },
    { title: "Total Tasks", value: 34 },
    { title: "Pending Approvals", value: 7 },
    { title: "Approved Tasks", value: 21 },
  ];

  return (
    <div>
      <h2 className="page-heading">Dashboard Overview</h2>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h3 className="stat-value">{item.value}</h3>
            <p className="stat-title">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;
