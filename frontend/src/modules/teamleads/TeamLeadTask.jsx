import React, { useEffect, useState } from "react";
import { getTasks } from "../../api/taskService";
import "./Projects.css";

export default function TeamLeadTask() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
            setError("Failed to load tasks.");
            setLoading(false);
        }
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="projects-container">
            <h2 className="projects-title">Team Tasks</h2>

            <div className="projects-table">
                <div
                    className="projects-header"
                    style={{ gridTemplateColumns: "1fr 1fr 1fr 100px 120px" }}
                >
                    <span>Title</span>
                    <span>Project ID</span>
                    <span>Assigned To ID</span>
                    <span>Status</span>
                    <span>Deadline</span>
                </div>

                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="projects-row"
                        style={{ gridTemplateColumns: "1fr 1fr 1fr 100px 120px" }}
                    >
                        <span>{task.title}</span>
                        <span>{task.project}</span>
                        <span>{task.assigned_to}</span>
                        <span
                            className={
                                task.status === "Completed"
                                    ? "status-completed"
                                    : task.status === "In Progress"
                                        ? "status-progress"
                                        : "status-pending"
                            }
                        >
                            {task.status}
                        </span>
                        <span>{task.deadline}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
