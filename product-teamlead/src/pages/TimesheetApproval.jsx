import React, { useEffect, useState } from "react";
import { getTimesheets, updateTimesheet } from "../api/api";

function TimesheetApproval() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    getTimesheets().then((res) => setTimesheets(res.data));
  }, []);

  const approve = (id) => {
    updateTimesheet(id, { approved: true }).then(() => alert("Approved"));
  };

  const reject = (id) => {
    updateTimesheet(id, { approved: false }).then(() => alert("Rejected"));
  };

  return (
    <table>
      <thead>
        <tr><th>Employee</th><th>Task</th><th>Hours</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {timesheets.map(ts => (
          <tr key={ts.id}>
            <td>{ts.employee}</td>
            <td>{ts.task}</td>
            <td>{ts.hours}</td>
            <td>
              <button onClick={() => approve(ts.id)}>Approve</button>
              <button onClick={() => reject(ts.id)}>Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TimesheetApproval;
