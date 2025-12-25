import axiosClient from "./axiosClient";

// 🔹 Get all timesheets
export const getTimesheets = () => {
  return axiosClient.get("timesheets/");
};

// 🔹 Create new timesheet
export const createTimesheet = (data) => {
  return axiosClient.post("timesheets/", data);
};

// 🔹 Update timesheet
export const updateTimesheet = (id, data) => {
  return axiosClient.patch(`timesheets/${id}/`, data);
};

// 🔹 Submit timesheet (custom action if exists)
export const submitTimesheet = (id) => {
  return axiosClient.post(`timesheets/${id}/submit/`);
};

// 🔹 Approve / Reject (old way, keeping for compat if needed, but updateTimesheet handles status)
export const approveTimesheet = (id, status) => {
  return axiosClient.post(`timesheets/${id}/approve/`, { status });
};

const timesheetApi = {
  list: getTimesheets,
  create: createTimesheet,
  submit: submitTimesheet,
  approve: approveTimesheet
};

export default timesheetApi;
