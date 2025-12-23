import React from "react";
import TeamLeadStats from "./TeamLeadStats";
import TimesheetApproval from "./TimesheetApproval";

export default function Dashboard() {
  return (
    <div>
      <div className="welcome-text">Team Lead Dashboard</div>

      {/* Stats Cards */}
      <TeamLeadStats />

      {/* Spacing */}
      <div style={{ marginTop: "30px" }}></div>

      {/* Approval Table */}
      <TimesheetApproval />
    </div>
  );
}
