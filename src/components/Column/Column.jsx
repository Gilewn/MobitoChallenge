import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";

import {
  ColumnContainer,
  ColumnTitle,
  TaskList,
  FunctionButtonsContainer,
  FunctionButtonsInnerContainer,
  FunctionButton,
  Input,
} from "../../shared/styled-stylesheet";

import Task from "../Task/Task";

const Column = (props) => {
  const [title, setTitle] = useState(props.column.title);
  const [isEdit, setIsEdit] = useState({
    isEditValue: false,
    clickedColumn: null,
  });
  const history = useHistory();

  const editColumnHandler = (id) => {
    setIsEdit({
      isEditValue: !isEdit.isEditValue,
      clickedColumn: id,
    });
  };

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const calculateAverage = () => {
    let sum = 0;
    for (let i = 0; i < props.tasks.length; i++) {
      sum +=
        parseInt(props.tasks[i].estimatedTime.hours * 60) +
        parseInt(props.tasks[i].estimatedTime.minutes);
    }

    let avg = sum / props.tasks.length;
    return avg.toFixed(2);
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          {!isEdit.isEditValue && !isEdit.clickedColumn ? (
            <ColumnTitle {...provided.dragHandleProps}>
              {props.column.title} -{" "}
              {props.tasks.length === 1
                ? `${props.tasks.length} Task`
                : `${props.tasks.length} Tasks`}{" "}
              {props.tasks.length > 0 &&
                `- Average Time: ${calculateAverage()} min`}
            </ColumnTitle>
          ) : (
            <ColumnTitle {...provided.dragHandleProps}>
              <Input
                id="update-column"
                name="updateColumn"
                type="text"
                placeholder="Please enter new title"
                value={title}
                onChange={changeTitleHandler}
                full
              />
            </ColumnTitle>
          )}
          <FunctionButtonsContainer>
            <FunctionButton
              onClick={() => props.onDelete(props.column.id)}
              disabled={props.tasks.length !== 0}
            >
              DELETE
            </FunctionButton>
            {!isEdit.isEditValue && !isEdit.clickedColumn ? (
              <FunctionButton
                onClick={() => editColumnHandler(props.column.id)}
              >
                EDIT
              </FunctionButton>
            ) : (
              <FunctionButtonsInnerContainer>
                <FunctionButton
                  onClick={() =>
                    setIsEdit({ isEditValue: false, clickedColumn: null })
                  }
                >
                  CANCEL
                </FunctionButton>
                <FunctionButton
                  onClick={() => {
                    props.onUpdate(props.column.id, title);
                    setIsEdit({ isEditValue: false, clickedColumn: null });
                  }}
                >
                  UPDATE
                </FunctionButton>
              </FunctionButtonsInnerContainer>
            )}
          </FunctionButtonsContainer>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <FunctionButton
            onClick={() =>
              history.push({ pathname: "/create-task", state: props.column.id })
            }
          >
            CREATE TASK
          </FunctionButton>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default Column;
