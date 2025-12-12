import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Create Employee", path: "/manager/create-employee" },
    { label: "Assign Task", path: "/manager/assign-task" },
    { label: "Employee Tasks", path: "/manager/employee-tasks" },
    { label: "Team Overview", path: "/manager/team-overview" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Timesheet</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            ...styles.link,
            background:
              pathname === item.path ? "#4F46E5" : "transparent",
            color: pathname === item.path ? "white" : "#E5E7EB",
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "230px",
    background: "#111827",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "white",
    marginBottom: "30px",
  },
  link: {
    padding: "12px",
    textDecoration: "none",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "15px",
    display: "block",
  },
};
