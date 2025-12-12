export default function Card({ children }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
}
