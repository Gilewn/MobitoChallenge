const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Wash the car",
      content: "I will wash the car well tomorrow at noon",
      estimatedTime: {
        hours: "2",
        minutes: "30",
      },
      priority: 2,
    },
    "task-2": {
      id: "task-2",
      title: "Supermarket",
      content: "I have to buy vegetables",
      estimatedTime: {
        hours: "1",
        minutes: "10",
      },
      priority: 1,
    },
    "task-3": {
      id: "task-3",
      title: "Running",
      content: "Tomorrow I will go for a run on the football field",
      estimatedTime: {
        hours: "0",
        minutes: "45",
      },
      priority: 3,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
