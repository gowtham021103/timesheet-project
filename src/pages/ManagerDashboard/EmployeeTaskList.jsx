import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getEmployeeTasks } from "../../api/taskApi";

export default function EmployeeTaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // demo employee id = 1
    getEmployeeTasks(1).then((res) => setTasks(res.data));
  }, []);

  return (
    <Card>
      <h2>Employee Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: "#F3F4F6",
            padding: 10,
            borderRadius: 6,
            marginBottom: 10,
          }}
        >
          <strong>{task.title}</strong>
          <br />
          Status: {task.status}
        </div>
      ))}
    </Card>
  );
}
