import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import axiosClient from "../../api/axiosClient";

export default function HREmployees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔄 Fetch employees from backend
    useEffect(() => {
        async function loadEmployees() {
            try {
                const res = await axiosClient.get("/accounts/employees/");
                setEmployees(res.data);
            } catch (err) {
                console.error("Failed to fetch employees", err);
                setError("Failed to load employees");
            } finally {
                setLoading(false);
            }
        }

        loadEmployees();
    }, []);

    // 🔍 Search filter
    const filtered = employees.filter((emp) =>
        emp.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="table-header">
                <h2>Employee Directory</h2>
            </div>

            <div style={{ padding: "20px" }}>
                <SearchBar setSearch={setSearch} />

                {loading && <p>Loading employees...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No employees found</td>
                                    </tr>
                                ) : (
                                    filtered.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.username}</td>
                                            <td>{emp.role}</td>
                                            <td>
                                                <span className={`status-badge ${emp.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
                                                    {emp.username.includes('Inactive') ? 'Inactive' : 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
