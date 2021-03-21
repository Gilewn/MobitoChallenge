import React from "react";

import { BackdropContainer } from "../../shared/styled-stylesheet";

const Backdrop = (props) => {
  return <BackdropContainer onClick={props.onClick}></BackdropContainer>;
};

export default Backdrop;
