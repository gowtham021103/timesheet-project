import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, updateEmployee } from "../../api/employeeService";
import Sidebar from "./TeamLeadSidebar";
import "./manager.css";
import { employees as sampleEmployees } from "../../sample-data";

const TeamLeadSelectionPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDummy, setIsDummy] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setFetching(true);
      const res = await getEmployees();
      setEmployees(res.data || []);
      setIsDummy(false);
      setError("");
    } catch (err) {
      console.error(err);
      // fallback to sample data when backend is not available or user isn't connected
      setEmployees(sampleEmployees || []);
      setIsDummy(true);
      setError("Using dummy employee data (offline)");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSetLead = async () => {
    if (!selectedLead) return setError("Select an employee to set as Team Lead");
    try {
      setLoading(true);
      setError("");
      if (isDummy) {
        // simulate setting team lead locally
        setEmployees((prev) =>
          prev.map((emp) => ({
            ...emp,
            role: emp.id == selectedLead ? "Team Lead" : emp.role === "Team Lead" ? "Employee" : emp.role,
          }))
        );
        alert("(Dummy) Team Lead updated successfully!");
        // notify other views
        try {
          localStorage.setItem("employeesUpdatedAt", Date.now().toString());
        } catch (e) {}
        try { localStorage.setItem("selectedEmployees", JSON.stringify([String(selectedLead)])); } catch (e) {}
        window.dispatchEvent(new CustomEvent("employeesUpdated"));
        // immediately show only this selected employee in the selection view
        setEmployees((prev) => prev.filter((emp) => String(emp.id) === String(selectedLead)));
        setShowOnlySelected(true);
        // navigate and include selected id in query param for reliable filtering
        navigate(`/viewEmployees?selected=${encodeURIComponent(String(selectedLead))}`);
      } else {
        // backend expects a role value; use lowercase 'team_lead' or backend-specific value
        await updateEmployee(selectedLead, { role: "team_lead" });
        alert("Team Lead updated successfully!");
        fetchEmployees();
        try {
          localStorage.setItem("employeesUpdatedAt", Date.now().toString());
        } catch (e) {}
        try { localStorage.setItem("selectedEmployees", JSON.stringify([String(selectedLead)])); } catch (e) {}
        window.dispatchEvent(new CustomEvent("employeesUpdated"));
        // immediately filter selection UI to the chosen employee
        setEmployees((prev) => prev.filter((emp) => String(emp.id) === String(selectedLead)));
        setShowOnlySelected(true);
        // navigate and include selected id in query param for reliable filtering
        navigate(`/viewEmployees?selected=${encodeURIComponent(String(selectedLead))}`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to set Team Lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="task-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="page-heading">Team Lead Selection</h2>
          <div>
            <button className="secondary-btn" onClick={fetchEmployees}>Refresh</button>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-card">
          <div className="table-card">
            {employees.length === 0 ? (
              <p>No employees available.</p>
            ) : (
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => {
                    const displayName = emp.first_name || emp.name || emp.username || "Unnamed";
                    const displayRole = emp.role === "team_lead" ? "Team Lead" : emp.role || "Employee";
                    const isLead = emp.role === "team_lead" || emp.role === "Team Lead";
                    return (
                      <tr key={emp.id} className={isLead ? "highlight" : ""}>
                        <td>{displayName}</td>
                        <td>{emp.email}</td>
                        <td>{displayRole}</td>
                        <td>
                          <input
                            type="radio"
                            name="teamLead"
                            checked={selectedLead == emp.id}
                            onChange={() => setSelectedLead(emp.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="primary-btn" onClick={handleSetLead} disabled={loading}>
              {loading ? "Saving..." : "Set as Team Lead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadSelectionPage;
