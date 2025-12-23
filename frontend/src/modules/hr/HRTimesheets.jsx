import React, { useEffect, useState } from "react";
import { getTimesheets } from "../../api/api";

export default function HRTimesheets() {
    const [timesheets, setTimesheets] = useState([]);

    useEffect(() => {
        getTimesheets().then((res) => setTimesheets(res.data));
    }, []);

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>All Timesheets</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Task</th>
                        <th>Hours</th>
                        <th>Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map((ts) => (
                        <tr key={ts.id}>
                            <td>{ts.id}</td>
                            <td>{ts.employee}</td>
                            <td>{ts.task}</td>
                            <td>{ts.hours}</td>
                            <td>
                                <span className={`status-badge ${ts.approved ? 'active' : 'leave'}`}>
                                    {ts.approved ? "Approved" : "Pending"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
