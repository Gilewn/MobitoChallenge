import React from "react";

import {
  MainNavigationList,
  MainNavigationListItems,
  MainNavigationListItemsLink,
} from "../../shared/styled-stylesheet";

const NavLinks = () => {
  return (
    <MainNavigationList>
      <MainNavigationListItems>
        <MainNavigationListItemsLink to="/create-column" exact>
          CREATE COLUMN
        </MainNavigationListItemsLink>
      </MainNavigationListItems>
    </MainNavigationList>
  );
};

export default NavLinks;
