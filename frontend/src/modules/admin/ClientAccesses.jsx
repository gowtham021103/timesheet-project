import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import AdminLayout from "../../layout/AdminLayout";
import "./ClientAccesses.css";

export default function ClientAccesses() {
  const [accesses, setAccesses] = useState([]);
  const [selectedAccesses, setSelectedAccesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Full list of allowed client accesses (read-only/visibility actions)
  useEffect(() => {
    const allowed = [
      // Timesheet & Work Tracking
      'View submitted timesheets',
      'View timesheet status (Pending / Approved / Rejected)',
      'Approve timesheets',
      'Reject timesheets',
      'Add comments or remarks on timesheets',
      'View historical timesheets',
      'Filter timesheets by date / project / employee',

      // Projects
      'View assigned projects',
      'View project details (name, duration, status)',
      'View project milestones (read-only)',
      'View project progress',

      // Team Visibility
      'View team members assigned to their projects',
      'View roles/designations of team members',
      'View individual contribution summaries (hours worked)',

      // Reports & Analytics
      'View daily work reports',
      'View weekly/monthly summaries',
      'View utilization reports (hours vs allocation)',
      'Download reports (PDF / Excel)',
      'View performance summaries (read-only)',

      // Billing & Finance
      'View invoices',
      'View billing summaries',
      'View approved billable hours',
      'Download invoices',
      'View payment status',

      // Dashboard & Monitoring
      'View client dashboard',
      'View KPIs (hours logged, approval rate, billing)',
      'View project-level statistics',

      // Audit & Compliance
      'View audit logs related to timesheet approvals/rejections/comments',
      'View approval history',

      // Account & Profile
      'View own client profile',
      'Update limited profile fields (contact info, logo)',
      'Change password',
    ];

    setAccesses(allowed);
    setSelectedAccesses([]);
    setLoading(false);
    // fetch list of clients for selection
    (async () => {
      try {
        const res = await axiosClient.get('admin/clients/');
        setClients(res.data || []);
        if (res.data && res.data.length > 0) {
          setSelectedClient(res.data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch clients list:', err);
      }
    })();
  }, []);

  

  const handleToggle = (access) => {
    setSelectedAccesses((prev) =>
      prev.includes(access)
        ? prev.filter((a) => a !== access)
        : [...prev, access]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!selectedClient) throw new Error('No client selected');
      await axiosClient.post("admin/client-accesses/", {
        client_id: selectedClient,
        accesses: selectedAccesses,
      });
      setSuccess("Client accesses updated successfully.");
    } catch (err) {
      console.error("Failed to save accesses:", err);
      setError("Failed to update client accesses.");
    } finally {
      setSaving(false);
    }
  };

  // load assigned accesses when selectedClient changes
  useEffect(() => {
    if (!selectedClient) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`admin/client-accesses/?client_id=${selectedClient}`);
        if (!mounted) return;
        setSelectedAccesses(res.data.assigned_accesses || []);
      } catch (err) {
        console.error('Failed to load assigned accesses:', err);
        setError('Unable to load assigned accesses for selected client.');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [selectedClient]);

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Client Accesses
          </h2>
          <p className="mt-2 text-gray-600">
            Select the accesses to grant to the client
          </p>

          {loading ? (
            <p className="mt-6 text-gray-500">Loading accesses...</p>
          ) : (
            <div className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Client</label>
                <select
                  value={selectedClient || ''}
                  onChange={(e) => setSelectedClient(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select client --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.user__username || c.name || c.user__email}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 max-h-80 overflow-auto p-2 border rounded">
                {accesses.map((access) => (
                  <label
                    key={access}
                    className="flex items-center gap-3 text-sm text-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAccesses.includes(access)}
                      onChange={() => handleToggle(access)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                    />
                    {access}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {error && (
            <p className="mt-4 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-sm text-green-600">{success}</p>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Accesses"}
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }
