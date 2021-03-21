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

const Task = (props) => {
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
    removeTask(taskId, props.columnId)
      .then((res) => {
        props.onTaskDelete(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTaskHandler = (taskId, data) => {
    data.columnId = props.columnId;
    for (let input in taskData) {
      if (taskData[input].length < 1) {
        setIsValid(false);
        setIsEdit({ isEditValue: true, clickedTask: taskId });
        return;
      } else {
        setIsValid(true);
        setIsEdit({ isEditValue: false, clickedTask: null });
      }
    }
    updateTask(taskId, data)
      .then((res) => {
        props.onTaskUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
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
      )}
    </Draggable>
  );
};

export default Task;
