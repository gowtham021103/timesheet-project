import { useEffect, useState } from "react";
import { getTimesheets, updateTimesheet } from "../../api/api";
import "../../styles/layout.css";
import "../../styles/EmployeeDashboard.css";
import "./manager.css";
import Sidebar from "./TeamLeadSidebar";

const TimesheetApprovals = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const fetchTimesheets = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getTimesheets();
            // Filter for pending approvals or just show all with status?
            // Since backend model has boolean 'approved', false = pending (or rejected? model implies binary). 
            // Actually model "approved" is boolean default False. It doesn't seem to have "Rejected" state unless we add a separate field or make it a status field.
            // Assuming False = Pending for now, or we can check logic. 
            // User requested "Approve and Reject". Boolean is only 2 states. 
            // We might need to handle this. For now let's assume !approved is pending.
            // But wait, if we Reject, it remains !approved. How to distinguish?
            // Ideal: Add status field to Timesheet. Current model: approved (bool).
            // If we assume approved=True is Approved, approved=False is Pending/Rejected.
            // For this task, I'll stick to the boolean. Approved = True.
            // If "Rejected", maybe we can't store it explicitly without schema change.
            // BUT existing TimesheetApproval.jsx had reject() setting approved:false.
            setTimesheets(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch timesheets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const handleApproval = async (id, status) => {
        try {
            setProcessingId(id);
            // status: true (approve) or false (reject/revoke)
            await updateTimesheet(id, { approved: status });
            setTimesheets(prev => prev.map(t => t.id === id ? { ...t, approved: status } : t));
            alert(status ? "Timesheet Approved" : "Timesheet Rejected (Marked as unapproved)");
        } catch (err) {
            console.error(err);
            setError("Failed to update timesheet status");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="layout">
            <Sidebar />
            <div className="main">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
                    <h2 className="welcome-text" style={{ margin: 0 }}>Timesheet Approvals</h2>
                    <button className="secondary-btn" onClick={fetchTimesheets}>Refresh</button>
                </div>

                {error && <p className="error-msg">{error}</p>}

                <div className="form-card">
                    {loading ? (
                        <p>Loading timesheets...</p>
                    ) : timesheets.length === 0 ? (
                        <p>No timesheets found.</p>
                    ) : (
                        <table className="simple-table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Task</th>
                                    <th>Hours</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timesheets.map((ts) => {
                                    // Filter logic: The user wants to "Approve and Reject".
                                    // We will show all for history, but actions for pending?
                                    // If approved is boolean, we can only toggle.
                                    return (
                                        <tr key={ts.id}>
                                            <td>{ts.employee_name || ts.employee}</td>
                                            <td>{ts.date}</td>
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
                                                            className="link-btn"
                                                            onClick={() => handleApproval(ts.id, true)}
                                                            disabled={processingId === ts.id}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="link-btn danger"
                                                            onClick={() => handleApproval(ts.id, false)}
                                                            disabled={processingId === ts.id}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="link-btn danger"
                                                        onClick={() => handleApproval(ts.id, false)}
                                                        disabled={processingId === ts.id}
                                                    >
                                                        Revoke
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimesheetApprovals;
