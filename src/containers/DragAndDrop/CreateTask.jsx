import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createTask } from "../../shared/tasks-http-service";
import {
  InputContainer,
  CreateColumnTitle,
  Input,
  SubmitButton,
} from "../../shared/styled-stylesheet";

const CreateTask = (props) => {
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    hours: "",
    minutes: "",
    priority: "",
  });
  const columnId = props.location.state;
  const history = useHistory();

  const changeTaskDataHandler = (value, name) => {
    setTaskData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createTaskHandler = () => {
    taskData.columnId = columnId;
    createTask(taskData).then((res) => {
      history.push({ pathname: "/", state: res.data });
    });
  };

  return (
    <InputContainer>
      <CreateColumnTitle>New Task</CreateColumnTitle>
      <Input
        id="task-title"
        name="title"
        type="text"
        placeholder="Please enter title"
        value={taskData.title}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
      />
      <Input
        id="task-content"
        name="content"
        type="text"
        placeholder="Please enter description"
        value={taskData.content}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
      />
      <Input
        id="task-estimated-time"
        name="hours"
        type="number"
        placeholder="Please enter estimated hours"
        value={taskData.hours}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
      />
      <Input
        id="task-estimated-time"
        name="minutes"
        type="number"
        placeholder="Please enter estimated hours"
        value={taskData.minutes}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
      />
      <Input
        id="task-priority"
        name="priority"
        type="number"
        placeholder="Please enter the priority"
        value={taskData.priority}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
      />
      <SubmitButton onClick={createTaskHandler}>CREATE</SubmitButton>
    </InputContainer>
  );
};

export default CreateTask;
