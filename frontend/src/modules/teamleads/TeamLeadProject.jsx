import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projectService";
import "./Projects.css";

export default function TeamLeadProject() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch projects", err);
            setError("Failed to load projects.");
            setLoading(false);
        }
    };

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="projects-container">
            <h2 className="projects-title">Team Projects</h2>

            <div className="projects-table">
                <div
                    className="projects-header"
                    style={{ gridTemplateColumns: "50px 1fr 150px" }}
                >
                    <span>ID</span>
                    <span>Project Name</span>
                    <span>Team Lead ID</span>
                </div>

                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="projects-row"
                        style={{ gridTemplateColumns: "50px 1fr 150px" }}
                    >
                        <span>{project.id}</span>
                        <span>{project.title}</span>
                        <span>{project.team_lead}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
