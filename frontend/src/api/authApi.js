import axiosClient from "./axiosClient";

const authApi = {
  // 🔐 LOGIN (SimpleJWT)
  login: async (username, password) => {
    const res = await axiosClient.post("/accounts/login/", {
      username,
      password,
    });
    return res.data; // 🔥 MUST return
  },

  // 👤 GET USER PROFILE
  profile: async () => {
    const res = await axiosClient.get("/accounts/profile/");
    return res.data;
  },

  // 📝 REGISTER
  register: async (username, email, password) => {
    const res = await axiosClient.post("/accounts/register/", {
      username,
      email,
      password,
    });
    return res.data;
  },
};

export default authApi;
