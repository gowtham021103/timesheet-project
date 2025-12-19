import { useState } from "react";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      role,
    });

    alert("Employee added successfully");

    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div>
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <br /><br />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
