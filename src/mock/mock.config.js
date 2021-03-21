import MockAdapter from "axios-mock-adapter";

import initialData from "../shared/initial-data";

export const isMockEnabled = () => {
  return process.env.REACT_APP_MOCK_ENABLED === "true";
};

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance);
  mock.onGet("/columns-with-tasks").reply(() => getColumnsWithTasks());
  mock.onPost("/columns").reply((config) => addColumn(config));
  mock.onPut(/\/columns\/\w+/).reply((config) => editColumn(config));
  mock.onDelete(/\/columns\/\w+/).reply((config) => removeColumn(config));
  mock.onPost("/tasks").reply((config) => addTask(config));
  mock.onPut(/\/tasks\/\w+/).reply((config) => editTask(config));
  mock.onPut(/\/task\/\w+/).reply((config) => removeTask(config));
};

export const getColumnsWithTasks = () => {
  return [200, initialData];
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
  const column = config.data;
  const newColumns = {
    ...initialData,
    columns: {
      ...initialData.columns,
      [id]: { id: id, title: column, taskIds: [] },
    },
  };
  return [200, newColumns];
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
  let newColumns = initialData;
  newColumns.tasks[task.title] = {
    id: task.title,
    title: task.title,
    content: task.content,
    estimatedTime: {
      hours: task.hours,
      minutes: task.minutes,
    },
    priority: task.priority,
  };
  newColumns.columns[task.columnId].taskIds = newColumns.columns[
    task.columnId
  ].taskIds.concat(task.title);
  return [200, newColumns];
};

export const editTask = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const task = JSON.parse(config.data);
  const newColumns = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [id]: {
        id: id,
        title: task.title,
        content: task.content,
        estimatedTime: {
          hours: task.hours,
          minutes: task.minutes,
        },
        priority: task.priority,
      },
    },
  };
  return [200, newColumns];
};

export const removeTask = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const column = config.data;
  let newColumns = initialData;
  delete newColumns.tasks[id];
  newColumns.columns[column].taskIds = newColumns.columns[
    column
  ].taskIds.filter((taskId) => taskId !== id);
  return [204, newColumns];
};

const extractIdPathParamFromUrl = (config) => {
  return config.url.split("/").pop();
};
