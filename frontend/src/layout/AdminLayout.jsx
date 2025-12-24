import React from "react";
import AdminSidebar from "../modules/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: 220, padding: 24 }}>
        {children}
      </div>
    </div>
  );
}
