export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#4F46E5",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        color: "white",
        cursor: "pointer",
        fontSize: "15px",
        width: "100%",
        marginTop: "10px",
      }}
    >
      {children}
    </button>
  );
}
