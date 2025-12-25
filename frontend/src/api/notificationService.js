import axiosClient from "./axiosClient";

export const getNotifications = () => {
    return axiosClient.get("notifications/");
};

export const markNotificationAsRead = (id) => {
    return axiosClient.patch(`notifications/${id}/read/`);
};
