import { useState } from "react";

export default function AssignProject() {
  const [employeeId, setEmployeeId] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      employeeId,
      projectName,
    });

    alert("Project assigned successfully");

    setEmployeeId("");
    setProjectName("");
  };

  return (
    <div>
      <h3>Assign Project</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        <br /><br />

        <input
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Assign Project</button>
      </form>
    </div>
  );
}
