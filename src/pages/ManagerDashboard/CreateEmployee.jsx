import { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createEmployee } from "../../api/employeeApi";

export default function CreateEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createEmployee(form);
    alert("Employee created!");
  }

  return (
    <Card>
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Button>Create Employee</Button>
      </form>
    </Card>
  );
}
