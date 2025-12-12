import axiosClient from "./axiosClient";

const projectApi = {
  list: async () => {
    const res = await axiosClient.get("projects/");
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post("projects/", data);
    return res.data;
  },

  assign: async (projectId, userId) => {
    const res = await axiosClient.post(`projects/${projectId}/assign/`, {
      user_id: userId,
    });
    return res.data;
  },
};

export default projectApi;
