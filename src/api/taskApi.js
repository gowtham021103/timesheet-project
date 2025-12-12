import { axiosClient } from "./axiosClient";

export const assignTask = (data) =>
  axiosClient.post("/tasks/assign/", data);

export const getEmployeeTasks = (id) =>
  axiosClient.get(`/tasks/employee/${id}/`);

export const getTeamOverview = () =>
  axiosClient.get("/tasks/team-overview/");
