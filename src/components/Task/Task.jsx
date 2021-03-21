import React from "react";
import { Draggable } from "react-beautiful-dnd";

import {
  TaskContainer,
  TaskTitle,
  TaskContent,
  TaskEstimatedTime,
  TaskPriority,
  FunctionButton,
  FunctionButtonsInnerContainer,
} from "../../shared/styled-stylesheet";

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
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
          <FunctionButtonsInnerContainer>
            <FunctionButton>DELETE</FunctionButton>
            <FunctionButton>EDIT</FunctionButton>
          </FunctionButtonsInnerContainer>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
