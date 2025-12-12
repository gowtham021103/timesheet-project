import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getTeamOverview } from "../../api/taskApi";

export default function TeamOverview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamOverview().then((res) => setTeam(res.data));
  }, []);

  return (
    <Card>
      <h2>Team Overview</h2>

      {team.map((emp) => (
        <div key={emp.id} style={{ marginBottom: 20 }}>
          <h3>{emp.name}</h3>
          <p>Total Tasks: {emp.total_tasks}</p>
          <p>Completed: {emp.completed}</p>
          <p>Hours Worked: {emp.hours}</p>
          <hr />
        </div>
      ))}
    </Card>
  );
}
