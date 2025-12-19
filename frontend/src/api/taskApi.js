import axiosClient from "./axiosClient";

const taskApi = {
  list: async () => {
    const res = await axiosClient.get("tasks/");
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("tasks/", data);
    return res.data;
  },

  assign: async (taskId, userId) => {
    const res = await axiosClient.post(`tasks/${taskId}/assign/`, {
      user_id: userId,
    });
    return res.data;
  },
};

export default taskApi;
