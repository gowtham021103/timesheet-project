import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import "./DashboardAdmin.css";

export default function DashboardAdmin() {
  const [dashboardData, setDashboardData] = useState({
    total_clients: null,
    admin_status: "Online",
    admin_username: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axiosClient
      .get("admin/dashboard-data/")
      .then((res) => {
        if (!mounted) return;
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
        if (mounted) {
          setDashboardData({
            total_clients: 0,
            admin_status: "Offline",
            admin_username: "Unknown",
          });
        }
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            WELCOME ADMIN
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of your workspace and quick stats.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Clients Card */}
          <div className="bg-white shadow rounded-lg p-6 flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500">
                Total Clients
              </h2>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {loading ? "Loading..." : dashboardData.total_clients}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Registered clients
              </p>
            </div>
          </div>

          {/* Admin Status Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-sm font-medium text-gray-500">
              Admin Status
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  dashboardData.admin_status === "Online"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
              <p className="text-2xl font-semibold text-gray-900">
                {loading ? "Loading..." : dashboardData.admin_status}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Current status
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
