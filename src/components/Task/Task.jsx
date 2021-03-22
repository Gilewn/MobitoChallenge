import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { removeTask, updateTask } from "../../shared/tasks-http-service";
import {
  TaskContainer,
  TaskTitle,
  TaskContent,
  TaskEstimatedTime,
  TaskPriority,
  FunctionButton,
  FunctionButtonsContainer,
  FunctionButtonsInnerContainer,
  TaskInnerContainer,
  Input,
  ErrorMessage,
} from "../../shared/styled-stylesheet";

import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const Task = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: props.task.title,
    content: props.task.content,
    hours: props.task.estimatedTime.hours,
    minutes: props.task.estimatedTime.minutes,
    priority: props.task.priority,
  });
  const [isValid, setIsValid] = useState(true);
  const [isEdit, setIsEdit] = useState({
    isEditValue: false,
    clickedTask: null,
  });

  const editTaskHandler = (id) => {
    setIsEdit({
      isEditValue: !isEdit.isEditValue,
      clickedTask: id,
    });
  };

  const changeTaskDataHandler = (value, name) => {
    setTaskData((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteTaskHandler = (taskId) => {
    setIsLoading(true);
    removeTask(taskId, props.columnId)
      .then((res) => {
        props.onTaskDelete(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const updateTaskHandler = (taskId, data) => {
    setIsLoading(true);
    data.columnId = props.columnId;
    for (let input in taskData) {
      if (taskData[input].length < 1) {
        setIsValid(false);
        setIsEdit({ isEditValue: true, clickedTask: taskId });
        setIsLoading(false);
        return;
      } else {
        setIsValid(true);
        setIsEdit({ isEditValue: false, clickedTask: null });
        setIsLoading(false);
      }
    }
    updateTask(taskId, data)
      .then((res) => {
        props.onTaskUpdate(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) =>
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {!isEdit.isEditValue && !isEdit.clickedTask ? (
              <TaskInnerContainer>
                <TaskTitle>{props.task.title}</TaskTitle>
                <TaskContent>{props.task.content}</TaskContent>
                <TaskEstimatedTime>
                  Estimated Time:{" "}
                  {props.task.estimatedTime.hours +
                    ":" +
                    props.task.estimatedTime.minutes +
                    ""}
                </TaskEstimatedTime>
                <TaskPriority>Priority: {props.task.priority}</TaskPriority>
              </TaskInnerContainer>
            ) : (
              <TaskInnerContainer>
                {!isValid && (
                  <ErrorMessage>All fields are required</ErrorMessage>
                )}
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
              </TaskInnerContainer>
            )}
            <FunctionButtonsContainer>
              <FunctionButton onClick={() => deleteTaskHandler(props.task.id)}>
                DELETE
              </FunctionButton>
              {!isEdit.isEditValue && !isEdit.clickedTask ? (
                <FunctionButton onClick={() => editTaskHandler(props.task.id)}>
                  EDIT
                </FunctionButton>
              ) : (
                <FunctionButtonsInnerContainer>
                  <FunctionButton
                    onClick={() =>
                      setIsEdit({ isEditValue: false, clickedTask: null })
                    }
                  >
                    CANCEL
                  </FunctionButton>
                  <FunctionButton
                    onClick={() => updateTaskHandler(props.task.id, taskData)}
                  >
                    UPDATE
                  </FunctionButton>
                </FunctionButtonsInnerContainer>
              )}
            </FunctionButtonsContainer>
          </TaskContainer>
        )
      }
    </Draggable>
  );
};

export default Task;
