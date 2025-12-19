import axiosClient from "./axiosClient";

const timesheetApi = {
  list: async () => {
    const res = await axiosClient.get("timesheets/");
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("timesheets/", data);
    return res.data;
  },

  submit: async (id) => {
    const res = await axiosClient.post(`timesheets/${id}/submit/`);
    return res.data;
  },

  approve: async (id, status) => {
    const res = await axiosClient.post(`timesheets/${id}/approve/`, {
      status,
    });
    return res.data;
  },
};

export default timesheetApi;
