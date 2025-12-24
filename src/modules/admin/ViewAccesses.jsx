import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import AdminLayout from "../../layout/AdminLayout";

export default function ViewAccesses() {
  const [clientsWithAccesses, setClientsWithAccesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("admin/clients/");
        const clients = res.data || [];

        const items = await Promise.all(
          clients.map(async (c) => {
            try {
              const r = await axiosClient.get(
                `admin/client-accesses/?client_id=${c.id}`
              );
              return { client: c, accesses: r.data.assigned_accesses || [] };
            } catch (err) {
              console.error("Failed to fetch accesses for client", c.id, err);
              return { client: c, accesses: [] };
            }
          })
        );

        if (!mounted) return;
        setClientsWithAccesses(items);
      } catch (err) {
        console.error("Failed to load clients:", err);
        if (mounted) setError("Failed to load client accesses.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Client Accesses</h2>
          <p className="mt-2 text-gray-600">Accesses assigned to each client</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading client accesses...</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">#</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Client</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Company</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Accesses</th>
                </tr>
              </thead>
              <tbody>
                {clientsWithAccesses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                      No clients found
                    </td>
                  </tr>
                ) : (
                  clientsWithAccesses.map(({ client, accesses }, idx) => (
                    <tr key={client.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{client.user__username || client.name || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{client.user__email || client.email || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{client.company_name || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {accesses && accesses.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {accesses.map((a) => (
                              <li key={a} className="text-sm text-gray-700">{a}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-sm text-gray-500">No accesses assigned</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
