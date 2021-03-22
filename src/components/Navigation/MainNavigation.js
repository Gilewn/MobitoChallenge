import React, { useState } from "react";

import {
  MainNavigationMenuButton,
  MainNavigationMenuButtonSpan,
  MainNavigationTitle,
  MainNavigationHeaderNav,
  MainNavigationDrawerNav,
  MainNavigationTitleLink,
} from "../../shared/styled-stylesheet";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop/Backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <MainNavigationDrawerNav>
          <NavLinks />
        </MainNavigationDrawerNav>
      </SideDrawer>
      <MainHeader>
        <MainNavigationMenuButton onClick={openDrawerHandler}>
          <MainNavigationMenuButtonSpan />
          <MainNavigationMenuButtonSpan />
          <MainNavigationMenuButtonSpan />
        </MainNavigationMenuButton>
        <MainNavigationTitle>
          <MainNavigationTitleLink to="/">
            Mobito Challenge
          </MainNavigationTitleLink>
        </MainNavigationTitle>
        <MainNavigationHeaderNav>
          <NavLinks />
        </MainNavigationHeaderNav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
