import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import "./TeamCreation.css";

export default function TeamCreation() {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);

  // Fetch users by role on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [empRes, mgrRes] = await Promise.all([
          axiosClient.get("accounts/users-by-role/?role=employee"),
          axiosClient.get("accounts/users-by-role/?role=manager"),
        ]);
        setEmployees(empRes.data || []);
        setManagers(mgrRes.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  const handleToggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!teamName.trim()) {
      setError("Team name is required.");
      return;
    }

    const payload = {
      name: teamName.trim(),
      members: selectedMembers,
      team_lead: selectedTeamLead,
    };

    try {
      setLoading(true);
      // POST to backend endpoint at /api/clientapp/teams/
      await axiosClient.post("clientapp/teams/", payload);
      setSuccess("Team created successfully!");
      setTeamName("");
      setSelectedMembers([]);
      setSelectedTeamLead(null);
    } catch (err) {
      console.error("Failed to create team:", err);
      setError(err.response?.data?.error || err.message || "Failed to create team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900">Team creation</h2>
      <p className="mt-2 text-gray-600">Create a new team and select members.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Team Members</label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Employees */}
            <div className="border p-3 rounded bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Employees</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {employees.length === 0 ? (
                  <p className="text-sm text-gray-500">No employees available</p>
                ) : (
                  employees.map((emp) => (
                    <label key={emp.id} className="team-user-row">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(emp.id)}
                        onChange={() => handleToggleMember(emp.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span>{emp.username} ({emp.email})</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Managers */}
            <div className="border p-3 rounded bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Managers</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {managers.length === 0 ? (
                  <p className="text-sm text-gray-500">No managers available</p>
                ) : (
                  managers.map((mgr) => (
                    <label key={mgr.id} className="team-user-row">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(mgr.id)}
                        onChange={() => handleToggleMember(mgr.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span>{mgr.username} ({mgr.email})</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Team Leads - select one from employees */}
            <div className="border p-3 rounded bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Team Lead (Choose One)</h3>
              <p className="text-xs text-gray-500 mb-2">Select one employee as team lead</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="team-lead"
                    value={null}
                    checked={selectedTeamLead === null}
                    onChange={() => setSelectedTeamLead(null)}
                    className="w-4 h-4 text-indigo-600 border-gray-300"
                  />
                  <span className="text-gray-600">(None)</span>
                </label>
                {employees.length === 0 ? (
                  <p className="text-sm text-gray-500">No employees available</p>
                ) : (
                  employees.map((emp) => (
                    <label key={emp.id} className="teamlead-row">
                      <input
                        type="radio"
                        name="team-lead"
                        value={emp.id}
                        checked={selectedTeamLead === emp.id}
                        onChange={() => setSelectedTeamLead(emp.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300"
                      />
                      <span>{emp.username} ({emp.email})</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Team"}
          </button>
        </div>
      </form>
    </div>
  );
}
