import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { getProjects } from "../../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Fetch projects from backend
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // 🔍 Search filter
  const filtered = projects.filter((proj) =>
    proj.title?.toLowerCase().includes(search.toLowerCase()) ||
    proj.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>

      <div style={{ padding: "20px" }}>
        <SearchBar setSearch={setSearch} />

        {loading && <p>Loading projects...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="projects-table">
            <div className="projects-header">
              <span>ID</span>
              <span>Title</span>
              <span>Description</span>
              <span>Status</span>
              <span>Deadline</span>
              <span>Assigned To</span>
            </div>

            {filtered.length === 0 ? (
              <div className="projects-row">
                <span colSpan={6}>No projects found</span>
              </div>
            ) : (
              filtered.map((proj) => (
                <div key={proj.id} className="projects-row">
                  <span>{proj.id}</span>
                  <span>{proj.title}</span>
                  <span>{proj.description}</span>
                  <span
                    className={
                      proj.status === "Completed"
                        ? "status-completed"
                        : proj.status === "In Progress"
                          ? "status-progress"
                          : "status-pending"
                    }
                  >
                    {proj.status}
                  </span>
                  <span>{proj.deadline}</span>
                  <span>{proj.team_lead?.username || proj.team_lead}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
