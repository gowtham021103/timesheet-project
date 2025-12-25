import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../../api/taskService";
import "../../styles/layout.css";
import "../../styles/EmployeeDashboard.css";
import "./manager.css";
import Sidebar from "./TeamLeadSidebar";


const TaskApprovals = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectTaskId, setRejectTaskId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [processingTaskId, setProcessingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks from server");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const approveTask = async (id) => {
    try {
      setProcessingTaskId(id);
      // send lowercase status to backend; UI will display as-is from task object
      await updateTask(id, { status: "approved" });
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Approved" } : t)));
    } catch (err) {
      console.error(err);
      setError("Failed to approve task");
    } finally {
      setProcessingTaskId(null);
    }
  };

  const rejectTask = async () => {
    if (!rejectReason) return setError("Enter rejection reason");

    try {
      setProcessingTaskId(rejectTaskId);
      await updateTask(rejectTaskId, { status: "rejected", reason: rejectReason });
      setTasks((prev) =>
        prev.map((t) => (t.id === rejectTaskId ? { ...t, status: "Rejected", reason: rejectReason } : t))
      );
      setRejectTaskId(null);
      setRejectReason("");
    } catch (err) {
      console.error(err);
      setError("Failed to reject task");
    } finally {
      setProcessingTaskId(null);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
          <h2 className="welcome-text" style={{ margin: 0 }}>Task Approvals</h2>
          <div>
            <button className="secondary-btn" onClick={fetchTasks}>Refresh</button>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-card">
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const assigned = task.assigned_to || task.assigned || task.employee || task.user || task.assigned_to_info || null;
                  const empName =
                    task.assigned_to_username ||
                    task.employee_name ||
                    task.assigned_to_name ||
                    (assigned && typeof assigned === "object" && (assigned.first_name || assigned.name || assigned.username)) ||
                    (assigned && typeof assigned === "string" ? assigned : null) ||
                    "-";
                  const date = task.due_date || task.created_at || "-";
                  const status = task.status || "Pending";
                  return (
                    <tr key={task.id}>
                      <td>
                        <strong>{task.title}</strong>
                        {task.description && <div className="muted">{task.description}</div>}
                      </td>
                      <td>{empName}</td>
                      <td>{date}</td>
                      <td>
                        <span className={`status-badge ${String(status).toLowerCase().replace(/\s+/g, "-")}`}>
                          {status}
                        </span>
                      </td>
                      <td>
                        {String(status).toLowerCase() === "pending" || String(status).toLowerCase() === "awaiting" ? (
                          <>
                            <button className="link-btn" onClick={() => approveTask(task.id)} disabled={processingTaskId === task.id}>
                              {processingTaskId === task.id ? "Processing..." : "Approve"}
                            </button>
                            <button
                              className="link-btn danger"
                              onClick={() => setRejectTaskId(task.id)}
                              disabled={processingTaskId === task.id}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="muted">{status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {rejectTaskId && (
            <div className="modal-backdrop">
              <div className="modal">
                <h3>Reject Task</h3>
                <textarea
                  placeholder="Enter rejection reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="modal-actions">
                  <button className="secondary-btn" onClick={() => setRejectTaskId(null)}>
                    Cancel
                  </button>
                  <button className="primary-btn" onClick={rejectTask}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskApprovals;
