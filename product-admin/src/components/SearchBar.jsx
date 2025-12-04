export default function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search employee..."
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
    />
  );
}