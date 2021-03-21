import { http } from "./http";

export const getColumnWithTasks = () => {
  return http.get("/columns-with-tasks");
};

export const createTask = (data) => {
  return http.post("/tasks", data);
};

export const updateTask = (id, data) => {
  return http.put(`/tasks/${id}`, data);
};

export const removeTask = (id, columnId) => {
  return http.put(`/task/${id}`, columnId);
};
