import sampleProjects from "../Sample-projects";

export default function Projects() {
  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-table">
        <div className="projects-header">
          <span>ID</span>
          <span>Title</span>
          <span>Description</span>
          <span>Status</span>
          <span>Deadline</span>
          <span>Assigned To</span>
        </div>

        {sampleProjects.map((project) => (
          <div key={project.id} className="projects-row">
            <span>{project.id}</span>
            <span>{project.title}</span>
            <span>{project.description}</span>
            <span
              className={
                project.status === "Completed"
                  ? "status-completed"
                  : project.status === "In Progress"
                  ? "status-progress"
                  : "status-pending"
              }
            >
              {project.status}
            </span>
            <span>{project.deadline}</span>
            <span>{project.assignedTo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
