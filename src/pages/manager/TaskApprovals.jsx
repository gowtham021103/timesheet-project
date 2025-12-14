import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../../api/taskService";
import "./manager.css";

const TaskApprovals = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectTaskId, setRejectTaskId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const approveTask = async (id) => {
    try {
      await updateTask(id, { status: "Approved" });
      setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "Approved" } : t)));
    } catch (err) {
      console.error(err);
      alert("Failed to approve task");
    }
  };

  const rejectTask = async () => {
    if (!rejectReason) return alert("Enter rejection reason");

    try {
      await updateTask(rejectTaskId, { status: "Rejected", reason: rejectReason });
      setTasks(
        tasks.map((t) =>
          t.id === rejectTaskId ? { ...t, status: "Rejected", reason: rejectReason } : t
        )
      );
      setRejectTaskId(null);
      setRejectReason("");
    } catch (err) {
      console.error(err);
      alert("Failed to reject task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2 className="page-heading">Task Approvals</h2>
      <div className="table-card">
        <table className="employee-table">
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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.employee_name}</td>
                <td>{task.due_date}</td>
                <td>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  {task.status === "Pending" ? (
                    <>
                      <button className="link-btn" onClick={() => approveTask(task.id)}>
                        Approve
                      </button>
                      <button className="link-btn danger" onClick={() => setRejectTaskId(task.id)}>
                        Reject
                      </button>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
};

export default TaskApprovals;
