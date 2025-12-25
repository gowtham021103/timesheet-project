import React, { useEffect, useState } from "react";
import { getTimesheets, updateTimesheet } from "../../api/api";

function TimesheetApproval() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    getTimesheets().then((res) => setTimesheets(res.data));
  }, []);

  const approve = async (id) => {
    try {
      await updateTimesheet(id, { approved: true });
      setTimesheets(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
      alert("Approved");
    } catch (e) { console.error(e); }
  };

  const reject = async (id) => {
    try {
      await updateTimesheet(id, { approved: false });
      setTimesheets(prev => prev.map(t => t.id === id ? { ...t, approved: false } : t));
      alert("Rejected/Revoked");
    } catch (e) { console.error(e); }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Pending Approvals</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Task</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts.id}>
              <td>{ts.employee_name || ts.employee}</td>
              <td>{ts.task}</td>
              <td>{ts.hours}</td>
              <td>
                <span className={`status-badge ${ts.approved ? 'active' : 'pending'}`}>
                  {ts.approved ? "Approved" : "Pending"}
                </span>
              </td>
              <td>
                {!ts.approved ? (
                  <>
                    <button
                      onClick={() => approve(ts.id)}
                      className="status-badge active"
                      style={{ border: 'none', cursor: 'pointer', marginRight: '5px' }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(ts.id)}
                      className="status-badge leave"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => reject(ts.id)}
                    className="status-badge leave"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetApproval;
