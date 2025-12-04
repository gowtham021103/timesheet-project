export default function DashboardCards() {
  return (
    <div>
    <h2 className="welcome-text">
        Welcome to your Timesheet Dashboard 
        — manage attendance, track hours, and 
        <br></br> view team updates all in one place.
    </h2>
    <div className="cards">
      <div className="card">
        <h3>Total Working Hours</h3>
        <p>120</p>
      </div>
      <div className="card">
        <h3>Leave</h3>
        <p>10</p>
      </div>
      <div className="card">
        <h3>Status</h3>
        <p>Online</p>
      </div>
    </div>
    </div>
  );
}