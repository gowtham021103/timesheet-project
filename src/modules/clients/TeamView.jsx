import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function TeamView() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("clientapp/teams/");
        setTeams(res.data || []);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Failed to load teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const deleteTeam = async (teamId, teamName) => {
    const ok = window.confirm(`Delete team "${teamName}"? This cannot be undone.`);
    if (!ok) return;
    try {
      setDeletingId(teamId);
      await axiosClient.delete(`clientapp/teams/${teamId}/`);
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
    } catch (err) {
      console.error("Failed to delete team:", err);
      setError("Failed to delete team.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-600">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
      <p className="mt-2 text-gray-600">List of all created teams</p>

      {teams.length === 0 ? (
        <p className="mt-6 text-gray-500">No teams created yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              {/* Team Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {team.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {team.members?.length || 0} Members
                  </span>
                  <button
                    onClick={() => deleteTeam(team.id, team.name)}
                    disabled={deletingId === team.id}
                    className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    {deletingId === team.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              {/* Team Lead */}
              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Team Lead:</span>{" "}
                  {team.team_lead && team.team_lead.email
                    ? team.team_lead.email
                    : team.team_lead_email || "Not Assigned"}
                </p>
              </div>

              {/* Members */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Members
                </p>
                {team.members && team.members.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {team.members.map((member) => (
                      <li key={member.id}>{member.email}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No members assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
