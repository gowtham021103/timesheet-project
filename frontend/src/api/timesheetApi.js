import axiosClient from "./axiosClient";

const timesheetApi = {
  // 🔹 Get all timesheets (employee / admin)
  list: async () => {
    const res = await axiosClient.get("timesheets/");
    return res.data;
  },

  // 🔹 Create new timesheet
  create: async (data) => {
    const res = await axiosClient.post("timesheets/", data);
    return res.data;
  },

  // 🔹 Submit timesheet
  submit: async (id) => {
    const res = await axiosClient.post(`timesheets/${id}/submit/`);
    return res.data;
  },

  // 🔹 Approve / Reject (Admin)
  approve: async (id, status) => {
    const res = await axiosClient.post(
      `timesheets/${id}/approve/`,
      { status }
    );
    return res.data;
  },
};

export default timesheetApi;
