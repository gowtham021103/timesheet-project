import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div 
        style={{
          flex: 1,
          marginLeft: "230px",
          padding: "25px",
          background: "#f1f5f9",
          overflowY: "auto"
        }}
      >
        {children}
      </div>
    </div>
  );
}
