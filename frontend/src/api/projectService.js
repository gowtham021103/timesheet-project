import axiosClient from "./axiosClient";

// Get all projects
export const getProjects = () => {
    return axiosClient.get("projects/");
};

// Create a new project
export const createProject = (data) => {
    return axiosClient.post("projects/", data);
};

// Update project
export const updateProject = (id, data) => {
    return axiosClient.put(`projects/${id}/`, data);
};

// Delete project
export const deleteProject = (id) => {
    return axiosClient.delete(`projects/${id}/`);
};
