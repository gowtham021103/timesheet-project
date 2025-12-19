import { IoMdSearch } from "react-icons/io";

export default function SearchBar({ setSearch }) {
  return (
    <div className="search-container">
      <IoMdSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search employee..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}