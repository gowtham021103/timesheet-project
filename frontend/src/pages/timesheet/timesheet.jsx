import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './timesheet.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState("");
  const [task, setTask] = useState("");
  const [records, setRecords] = useState([]);

  // Today and 5 days ago
  const today = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5);

  const handleAddRecord = () => {
    if (!hours || !task) return alert("Please fill hours and task");

    setRecords([
      ...records,
      { date: date.toDateString(), hours, task }
    ]);
    setHours("");
    setTask("");
  };

  // Get list of dates that have records
  const markedDates = records.map(r => r.date);

  // Add class to calendar tiles if date is in markedDates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      if (markedDates.includes(dateString)) {
        return "bg-blue-200 rounded-full text-blue-800 font-semibold";
      }
    }
    return "";
  };

  return (
    <div className="app-container">
        <div className="app-header">
            <h1 className="text-2xl font-semibold ">Update Timesheet</h1>
        </div>
      <div className="app-content">
        {/* Calendar */}
        <div className="calendar-section">
          
          <Calendar
            onChange={setDate}
            value={date}
            minDate={fiveDaysAgo}
            maxDate={today}
            tileClassName={tileClassName}
          />
        </div>

        {/* Form */}
        <div className="form-section">
          <h2 className="section-title">➕ Add Task</h2>

          <div className="form-group">
            <label className="form-label">Selected Date</label>
            <div className="date-display">
              {date.toDateString()}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Working Hours</label>
            <input
              type="number"
              placeholder="Enter hours (e.g., 8)"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="form-input"
              min="0"
              max="24"
              step="0.5"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Task Description</label>
            <textarea
              placeholder="Enter task description..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button
            onClick={handleAddRecord}
            className="form-button"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Timesheet Table */}
      <div className="table-section">
        <div className="table-header">
          <h2 className="table-title">📊 Timesheet Records</h2>
          <p className="table-description">{records.length} task{records.length !== 1 ? 's' : ''} recorded</p>
        </div>

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
                <td colSpan="3" className="empty-state">
                  <div className="empty-icon">📭</div>
                  <div className="empty-text">No records yet</div>
                  <div className="empty-subtext">Add your first task to get started</div>
                </td>
              </tr>
            ) : (
              records.map((r, index) => (
                <tr key={index}>
                  <td>{r.date}</td>
                  <td><span className="hours-badge">{r.hours}h</span></td>
                  <td className="task-cell">{r.task}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
