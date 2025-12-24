import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import AdminLayout from "../../layout/AdminLayout";
import "./AdminClients.css";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company_name: "", contact_number: "" });
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching clients from: admin/clients/");
      const response = await axiosClient.get("admin/clients/");
      console.log("API Response:", response.data);
      console.log("Response type:", typeof response.data);
      console.log("Is array?", Array.isArray(response.data));
      console.log("Response status:", response.status);
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
       console.error("Error response:", err.response);
       console.error("Error status:", err.response?.status);
       console.error("Error data:", err.response?.data);
       console.error("Error message:", err.message);
       
       if (err.response?.status === 401) {
         setError("Unauthorized. Please log in again.");
       } else if (err.response?.status === 403) {
         setError("You don't have permission to view clients.");
       } else {
         setError("Failed to load clients. Please try again.");
       }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching clients...");
    fetchClients();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Client Details
            </h2>
            <p className="mt-2 text-gray-600">
              List of registered clients
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setShowAddForm((s) => !s);
                setSuccess("");
                setError("");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {showAddForm ? "Close" : "Add Client"}
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-white rounded shadow">
            {error && <div className="mb-3 p-2 bg-red-50 text-red-700 rounded">{error}</div>}
            {success && <div className="mb-3 p-2 bg-green-50 text-green-700 rounded">{success}</div>}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSuccess("");
                try {
                  setLoading(true);
                  const payload = {
                    name: form.name,
                    email: form.email,
                    company_name: form.company_name,
                    contact_number: form.contact_number,
                  };
                  const res = await axiosClient.post("admin/clients/", payload);
                  setSuccess(res.data?.message || "Client created successfully.");
                  setForm({ name: "", email: "", company_name: "", contact_number: "" });
                  await fetchClients();
                } catch (err) {
                  console.error("Create client failed:", err);
                  const msg = err.response?.data?.error || err.message || "Failed to create client.";
                  setError(msg);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="p-2 border rounded"
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="p-2 border rounded"
                  required
                />
                <input
                  placeholder="Company"
                  value={form.company_name}
                  onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                  className="p-2 border rounded"
                />
                <input
                  placeholder="Contact Number"
                  value={form.contact_number}
                  onChange={(e) => setForm((f) => ({ ...f, contact_number: e.target.value }))}
                  className="p-2 border rounded"
                />
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Contact
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No clients found
                  </td>
                </tr>
              ) : (
                clients.map((client, index) => (
                  <tr key={client.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {client.user__username || client.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {client.user__email || client.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {client.company_name || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {client.contact_number || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          title="Edit client"
                          onClick={() => navigate(`/admin/clients/edit/${client.id}`)}
                          className="icon-button"
                        >
                          {/* Pencil icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 hover:text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 15.25V18h2.75l8.486-8.486-2.75-2.75L2 15.25z" clipRule="evenodd" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          title="Delete client"
                          onClick={async () => {
                            if (!confirm('Delete this client? This cannot be undone.')) return;
                            try {
                              setLoading(true);
                              setError("");
                              await axiosClient.delete(`admin/clients/${client.id}/`);
                              await fetchClients();
                            } catch (err) {
                              console.error('Delete failed:', err);
                              setError('Failed to delete client.');
                            } finally {
                              setLoading(false);
                            }
                          }}
                          className="icon-button"
                        >
                          {/* Trash icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 6a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
