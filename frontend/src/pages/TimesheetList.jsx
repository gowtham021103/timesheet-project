import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./timesheet/timesheet.css";
import Sidebar from "../components/Sidebar";


export default function Timesheet() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState("");
  const [task, setTask] = useState("");
  const [records, setRecords] = useState([]);

  const today = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5);

  const handleAddRecord = () => {
    if (!hours || !task) return alert("Please fill all fields");

    setRecords([
      ...records,
      { date: date.toDateString(), hours, task },
    ]);

    setHours("");
    setTask("");
  };

  const markedDates = records.map((r) => r.date);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (markedDates.includes(date.toDateString())) {
        return "marked-date";
      }
    }
    return "";
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main">
        <h1 className="page-title">Update Timesheet</h1>

        <div className="timesheet-wrapper">
          {/* Calendar */}
          <div className="calendar-box">
            <Calendar
              onChange={setDate}
              value={date}
              minDate={fiveDaysAgo}
              maxDate={today}
              tileClassName={tileClassName}
            />
          </div>

          {/* Right Panel */}
          <div className="task-panel">
            <h2>Add Task</h2>

            <div className="form-group">
              <label>Date</label>
              <div className="date-display">{date.toDateString()}</div>
            </div>

            <div className="form-group">
              <label>Working Hours</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                max="24"
                step="0.5"
              />
            </div>

            <div className="form-group">
              <label>Task Description</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            <button className="add-btn" onClick={handleAddRecord}>
              Add Task
            </button>

            {/* Records */}
            <div className="records-section">
              <h3 className="text-lg font-bold">Timesheet Records</h3>

              <table>
                <thead>
                  <tr className="table-row">
                    <th className="table-head">Date</th>
                    <th className="table-head">Hours</th>
                    <th className="table-head">Task</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="empty">
                        No records yet
                      </td>
                    </tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i}>
                        <td>{r.date}</td>
                        <td>{r.hours}h</td>
                        <td>{r.task}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
