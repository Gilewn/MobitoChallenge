import React from "react";

import { MainContainer } from "./shared/styled-stylesheet";

import Routes from "./routes/Routes";
import MainNavigation from "./components/Navigation/MainNavigation";

const App = () => {
  return (
    <MainContainer>
      <MainNavigation />
      <Routes />
    </MainContainer>
  );
};

export default App;
