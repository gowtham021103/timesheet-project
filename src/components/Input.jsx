export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #D1D5DB",
        }}
      />
    </div>
  );
}
