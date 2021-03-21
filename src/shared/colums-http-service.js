import { http } from "./http";

export const getColumn = (id) => {
  return http.get(`/columns/${id}`);
};

export const createColumn = (data) => {
  return http.post("/columns", data);
};

export const updateColumn = (id, data) => {
  return http.put(`/columns/${id}`, data);
};

export const removeColumn = (id) => {
  return http.delete(`/columns/${id}`);
};
