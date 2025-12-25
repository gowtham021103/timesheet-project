import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { getTask } from "../api/taskService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function TimesheetForm({ editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    hours: "",
    task: "",
  });

  const [loading, setLoading] = useState(editMode);
  const [error, setError] = useState("");

  // Load existing timesheet for edit mode
  useEffect(() => {
    if (editMode && id) {
      loadTimesheet();
    }
  }, [editMode, id]);

  // Handle taskId query param for pre-filling
  const [params] = useSearchParams();
  const taskId = params.get("taskId");

  useEffect(() => {
    if (taskId && !editMode) {
      // fetch task details
      getTask(taskId)
        .then((res) => {
          setForm((prev) => ({ ...prev, task: res.data.title }));
        })
        .catch(err => console.error("Failed to fetch task details", err));
    }
  }, [taskId, editMode]);

  const loadTimesheet = async () => {
    try {
      const res = await axiosClient.get(`timesheets/${id}/`);
      setForm({
        date: res.data.date,
        hours: res.data.hours,
        task: res.data.task,
      });
    } catch (err) {
      setError("Failed to load timesheet");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editMode) {
        await axiosClient.put(`timesheets/${id}/`, form);
      } else {
        await axiosClient.post("timesheets/", form);
      }
      navigate("/timesheets");
    } catch (err) {
      setError("Failed to save timesheet");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {editMode ? "Edit Timesheet" : "Add Timesheet"}
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow max-w-xl space-y-4"
            >
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Hours</label>
                <input
                  type="number"
                  value={form.hours}
                  onChange={(e) =>
                    setForm({ ...form, hours: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Task Description</label>
                <textarea
                  value={form.task}
                  onChange={(e) =>
                    setForm({ ...form, task: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  rows="3"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editMode ? "Update" : "Add"}
                </Button>

                <button
                  type="button"
                  onClick={() => navigate("/timesheets")}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
