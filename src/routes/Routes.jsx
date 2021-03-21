import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import DragAndDrop from "../containers/DragAndDrop/DragAndDrop.jsx";
import CreateColumn from "../containers/DragAndDrop/CreateColumn";
import CreateTask from "../containers/DragAndDrop/CreateTask";

const routes = () => (
  <Switch>
    <Route path="/" exact component={DragAndDrop} />
    <Route path="/create-column" component={CreateColumn} />
    <Route path="/create-task" component={CreateTask} />
    <Redirect to="/" />
  </Switch>
);

export default routes;
