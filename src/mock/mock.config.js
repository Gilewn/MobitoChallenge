import MockAdapter from "axios-mock-adapter";

import initialData from "../shared/initial-data";

let columnsList = initialData.columns;
let tasksList = initialData.tasks;

export const isMockEnabled = () => {
  return process.env.REACT_APP_MOCK_ENABLED === "true";
};

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance);
  mock.onGet("/columns-with-tasks").reply(() => getColumnsWithTasks());
  mock.onPost("/columns").reply((config) => addColumn(config));
  mock.onPut(/\/columns\/\d+/).reply((config) => editColumn(config));
  mock.onDelete(/\/columns\/\w+/).reply((config) => removeColumn(config));
  mock.onPost("/tasks").reply((config) => addTask(config));
  mock.onPut(/\/tasks\/\d+/).reply((config) => editTask(config));
  mock.onDelete(/\/tasks\/\d+/).reply((config) => removeTask(config));
};

export const getColumnsWithTasks = () => {
  return [200, initialData];
};

export const getColumn = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const column = columnsList.find((c) => c.id === id);
  return [200, column];
};

export const addColumn = (config) => {
  const column = config.data;
  let newColumns = initialData;
  newColumns.columns[column] = { id: column, title: column, taskIds: [] };
  newColumns.columnOrder.push(column);
  return [200, newColumns];
};

export const editColumn = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const columnIndex = columnsList.findIndex((c) => c.id === id);
  const column = JSON.parse(config.data);
  columnsList[columnIndex] = column;
  return [200, column];
};

export const removeColumn = (config) => {
  const id = extractIdPathParamFromUrl(config);
  let newColumns = initialData;
  delete newColumns.columns[id];
  newColumns.columnOrder = newColumns.columnOrder.filter(
    (colId) => colId !== id
  );
  return [204, newColumns];
};

export const addTask = (config) => {
  const task = JSON.parse(config.data);
  tasksList.push(task);
  return [200, task];
};

export const editTask = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const taskIndex = tasksList.findIndex((c) => c.id === id);
  const task = JSON.parse(config.data);
  tasksList[taskIndex] = task;
  return [200, task];
};

export const removeTask = (config) => {
  const id = extractIdPathParamFromUrl(config);
  tasksList = tasksList.filter((c) => c.id !== id);
  return [204, null];
};

const extractIdPathParamFromUrl = (config) => {
  return config.url.split("/").pop();
};
