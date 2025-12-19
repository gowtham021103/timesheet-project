import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./timesheet.css";
import axiosClient from "../api/axiosClient";

function Timesheet() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState("");
  const [task, setTask] = useState("");
  const [records, setRecords] = useState([]);

  const today = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5);

  // 📥 Load from backend
  const loadTimesheets = async () => {
    try {
      const res = await axiosClient.get("timesheets/");
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load timesheets", err);
    }
  };

  useEffect(() => {
    loadTimesheets();
  }, []);

  // ➕ Save to backend
  const handleAddRecord = async () => {
    if (!hours || !task) {
      alert("Please fill hours and task");
      return;
    }

    try {
      await axiosClient.post("timesheets/", {
        date: date.toISOString().split("T")[0],
        hours,
        task,
      });

      setHours("");
      setTask("");
      loadTimesheets(); // 🔄 refresh list
    } catch (err) {
      console.error("Failed to add timesheet", err);
    }
  };

  const markedDates = records.map((r) =>
    new Date(r.date).toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (markedDates.includes(date.toDateString())) {
        return "marked-date";
      }
    }
    return "";
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Update Timesheet</h1>
      </div>

      <div className="app-content">
        <div className="calendar-section">
          <Calendar
            onChange={setDate}
            value={date}
            minDate={fiveDaysAgo}
            maxDate={today}
            tileClassName={tileClassName}
          />
        </div>

        <div className="form-section">
          <h2>Add Task</h2>

          <div className="form-group">
            <label>Date</label>
            <div className="date-display">
              {date.toDateString()}
            </div>
          </div>

          <div className="form-group">
            <label>Hours</label>
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
            <label>Task</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <button onClick={handleAddRecord}>
            Add Task
          </button>
        </div>
      </div>

      <div className="table-section">
        <h2>Timesheet Records</h2>

        <table className="timesheet-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="3">No records yet</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.date).toDateString()}</td>
                  <td>{r.hours}h</td>
                  <td>{r.task}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timesheet;
