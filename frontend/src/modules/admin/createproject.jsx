import { useState } from "react";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      projectName,
      description,
    });

    alert("Project created successfully");

    setProjectName("");
    setDescription("");
  };

  return (
    <div>
      <h3>Create Project</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />

        <br /><br />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
