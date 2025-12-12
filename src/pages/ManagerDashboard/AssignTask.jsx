import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getEmployees } from "../../api/employeeApi";
import { assignTask } from "../../api/taskApi";

export default function AssignTask() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    employee: "",
  });

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await assignTask(form);
    alert("Task assigned!");
  }

  return (
    <Card>
      <h2>Assign Task</h2>

      <form onSubmit={handleSubmit}>
        <Input label="Task Title" name="title" value={form.title} onChange={handleChange} />

        <label>Assign To</label>
        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        >
          <option>Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <Button>Assign</Button>
      </form>
    </Card>
  );
}
