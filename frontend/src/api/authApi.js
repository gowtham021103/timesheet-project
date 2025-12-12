import axiosClient from "./axiosClient";

const authApi = {
  login: async (username, password) => {
    const res = await axiosClient.post("token/", {
      username,
      password,
    });
    return res.data; // {access, refresh}
  },

  register: async (username, email, password) => {
    const res = await axiosClient.post("auth/register/", {
      username,
      email,
      password,
    });
    return res.data;
  },

  profile: async () => {
    const res = await axiosClient.get("auth/profile/");
    return res.data;
  },
};

export default authApi;
