import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <ul style={{ marginTop: "20px" }}>
        <li>
          <Link to="/admin/add-employee">Add Employee</Link>
        </li>
        <li>
          <Link to="/admin/assign-project">Assign Project</Link>
        </li>
        <li>
          <Link to="/admin/create-project">Create Project</Link>
        </li>
      </ul>
    </div>
  );
}
