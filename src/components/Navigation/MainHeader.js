import React from "react";

import { MainHeaderContainer } from "../../shared/styled-stylesheet";

const MainHeader = (props) => {
  return <MainHeaderContainer>{props.children}</MainHeaderContainer>;
};

export default MainHeader;
