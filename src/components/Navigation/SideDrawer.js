import React from "react";
import { CSSTransition } from "react-transition-group";

import { SideDrawerContainer } from "../../shared/styled-stylesheet";

const SideDrawer = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <SideDrawerContainer onClick={props.onClick}>
        {props.children}
      </SideDrawerContainer>
    </CSSTransition>
  );
};

export default SideDrawer;
