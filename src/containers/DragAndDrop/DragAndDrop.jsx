import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { DnDContainer } from "../../shared/styled-stylesheet";
import { getColumnWithTasks } from "../../shared/tasks-http-service";
import { removeColumn, updateColumn } from "../../shared/colums-http-service";

import Column from "../../components/Column/Column";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const DragAndDrop = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState();
  const [isEditCompleted, setIsEditCompleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (props.location.state) {
      setInitialState(props.location.state);
      setIsLoading(false);
    } else {
      getColumnWithTasks()
        .then((res) => {
          setInitialState(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setInitialState, setIsLoading, props.location.state]);

  const deleteColumnHandler = (columnId) => {
    setIsLoading(true);
    removeColumn(columnId)
      .then((res) => {
        setInitialState(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const updateColumnHandler = (columnId, data) => {
    setIsLoading(true);
    updateColumn(columnId, data)
      .then((res) => {
        setInitialState(res.data);
        setIsEditCompleted(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteTaskHandler = (data) => {
    setInitialState(data);
  };

  const updateTaskHandler = (data) => {
    setInitialState(data);
  };

  const onDragStart = () => {
    document.body.style.color = "#54f1eb";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;

    const opacity = destination
      ? destination.index / Object.keys(initialState.tasks).length
      : 0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(initialState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...initialState,
        columnOrder: newColumnOrder,
      };

      setInitialState(newState);
      return;
    }

    const startColumn = initialState.columns[source.droppableId];
    const finishColumn = initialState.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...initialState,
        columns: {
          ...initialState.columns,
          [newColumn.id]: newColumn,
        },
      };

      setInitialState(newState);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setInitialState(newState);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <DnDContainer {...provided.droppableProps} ref={provided.innerRef}>
            {initialState.columnOrder.map((columnId, index) => {
              const column = initialState.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => initialState.tasks[taskId]
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  onDelete={deleteColumnHandler}
                  onUpdate={updateColumnHandler}
                  updated={isEditCompleted}
                  onTaskDelete={deleteTaskHandler}
                  onTaskUpdate={updateTaskHandler}
                />
              );
            })}
            {provided.placeholder}
          </DnDContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
