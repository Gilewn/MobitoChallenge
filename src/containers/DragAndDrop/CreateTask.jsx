import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createTask } from "../../shared/tasks-http-service";
import {
  InputContainer,
  CreateColumnTitle,
  Input,
  SubmitButton,
  ErrorMessage,
} from "../../shared/styled-stylesheet";

import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const CreateTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    hours: "",
    minutes: "",
    priority: "",
  });
  const [isValid, setIsValid] = useState(true);
  const columnId = props.location.state;
  const history = useHistory();

  const changeTaskDataHandler = (value, name) => {
    setTaskData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createTaskHandler = () => {
    taskData.columnId = columnId;
    for (let input in taskData) {
      if (taskData[input].length < 1) {
        setIsValid(false);
        return;
      }
    }
    createTask(taskData).then((res) => {
      history.push({ pathname: "/", state: res.data });
    });
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <InputContainer>
      <CreateColumnTitle>New Task</CreateColumnTitle>
      {!isValid && <ErrorMessage>All fields are required</ErrorMessage>}
      <Input
        id="task-title"
        name="title"
        type="text"
        placeholder="Please enter title"
        value={taskData.title}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
        required
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
        required
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
        min="0"
        max="23"
      />
      <Input
        id="task-estimated-time"
        name="minutes"
        type="number"
        placeholder="Please enter estimated minutes"
        value={taskData.minutes}
        onChange={(event) =>
          changeTaskDataHandler(event.target.value, event.target.name)
        }
        min="0"
        max="59"
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
        min="0"
        max="5"
      />
      <SubmitButton onClick={createTaskHandler}>CREATE</SubmitButton>
    </InputContainer>
  );
};

export default CreateTask;
