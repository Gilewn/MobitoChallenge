import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import DragAndDrop from "../containers/DragAndDrop/DragAndDrop.jsx";
import CreateColumn from "../containers/DragAndDrop/CreateColumn";

const routes = () => (
  <Switch>
    <Route path="/" exact component={DragAndDrop} />
    <Route path="/create-column" component={CreateColumn} />
    <Redirect to="/" />
  </Switch>
);

export default routes;
