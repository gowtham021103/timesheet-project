import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function TimesheetList() {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTimesheets = async () => {
    try {
      const res = await axiosClient.get("timesheets/");
      setTimesheets(res.data);
    } catch (err) {
      console.error("Failed to fetch timesheets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimesheets();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Timesheets</h1>
            <Link
              to="/timesheets/new"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Timesheet
            </Link>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : timesheets.length === 0 ? (
            <p>No timesheets found</p>
          ) : (
            <div className="space-y-3">
              {timesheets.map((ts) => (
                <div
                  key={ts.id}
                  className="p-4 bg-white rounded shadow flex justify-between"
                >
                  <div>
                    <div className="font-semibold">{ts.project}</div>
                    <div className="text-sm text-gray-600">
                      {ts.date} — {ts.hours} hours
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/timesheets/${ts.id}/edit`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
