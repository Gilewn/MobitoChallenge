import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import {
  ColumnContainer,
  ColumnTitle,
  TaskList,
  ColumnHandle,
  DeleteColumnButton,
} from "../../shared/styled-stylesheet";

import Task from "../Task/Task";

const Column = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnTitle {...provided.dragHandleProps}>
            <ColumnHandle />
            {props.column.title}
          </ColumnTitle>
          <DeleteColumnButton
            onClick={() => props.onDelete(props.column.id)}
            disabled={props.tasks.length !== 0}
          >
            DELETE
          </DeleteColumnButton>
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
