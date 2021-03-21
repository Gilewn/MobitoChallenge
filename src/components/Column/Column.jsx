import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import {
  ColumnContainer,
  ColumnTitle,
  TaskList,
  ColumnHandle,
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

  const editColumnHandler = (id) => {
    setIsEdit({
      isEditValue: !isEdit.isEditValue,
      clickedColumn: id,
    });
  };

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          {!isEdit.isEditValue && !isEdit.clickedColumn ? (
            <ColumnTitle {...provided.dragHandleProps}>
              <ColumnHandle />
              {props.column.title}
            </ColumnTitle>
          ) : (
            <ColumnTitle {...provided.dragHandleProps}>
              <ColumnHandle />
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
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default Column;
