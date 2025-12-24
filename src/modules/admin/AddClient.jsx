import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import AdminLayout from "../../layout/AdminLayout";
import "./AddClient.css";

export default function AddClient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    contact_number: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const isEdit = Boolean(id);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email) {
      setError("Client name and email are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      let response;
      if (isEdit) {
        response = await axiosClient.put(`admin/clients/${id}/`, {
          name: formData.name,
          email: formData.email,
          company_name: formData.company_name,
          contact_number: formData.contact_number,
        });
        setSuccess("Client updated successfully!");
      } else {
        response = await axiosClient.post("admin/clients/", {
          name: formData.name,
          email: formData.email,
          company_name: formData.company_name,
          contact_number: formData.contact_number,
        });
        setSuccess("Client added successfully!");
      }

      setFormData({ name: "", email: "", company_name: "", contact_number: "", status: "Active" });

      // Navigate to clients list after 1 second
      setTimeout(() => navigate("/admin/clients"), 1000);
    } catch (err) {
      console.error("Failed to add client:", err);
      
      if (err.response?.status === 401) {
        setError("You are not authenticated. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to add clients.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to add client. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;

    const loadClient = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`admin/clients/${id}/`);
        const data = res.data || {};
        setFormData({
          name: data.user__username || "",
          email: data.user__email || "",
          company_name: data.company_name || "",
          contact_number: data.contact_number || "",
          status: "Active",
        });
      } catch (err) {
        console.error('Failed to load client:', err);
        setError('Failed to load client details.');
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [id]);

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Client' : 'Add New Client'}
          </h2>
          <p className="mt-2 text-gray-600">
            Enter client details below
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client name"
                className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Client Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter client email"
                className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter company name"
                className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Feedback */}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600">{success}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : isEdit ? 'Update Client' : 'Add Client'}
              </button>

              <a
                href="/admin/clients"
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
    </AdminLayout>
  );
}
