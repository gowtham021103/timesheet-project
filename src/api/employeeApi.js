import { axiosClient } from "./axiosClient";

export const createEmployee = (data) =>
  axiosClient.post("/employees/", data);

export const getEmployees = () =>
  axiosClient.get("/employees/");
