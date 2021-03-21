import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const MainContainer = styled.div``;

export const MainHeaderContainer = styled.header`
  height: 4rem;
  display: flex;
  align-items: center;
  background: #182a33;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;
  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const MainNavigationMenuButton = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MainNavigationMenuButtonSpan = styled.span`
  display: block;
  width: 3rem;
  height: 2.5px;
  background: white;
`;

export const MainNavigationTitle = styled.h1`
  color: white;
`;

export const MainNavigationHeaderNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

export const MainNavigationDrawerNav = styled.nav`
  height: 100%;
`;

export const MainNavigationTitleLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

export const SideDrawerContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

export const MainNavigationListItemsLink = styled(NavLink)`
  border: 1px solid transparent;
  color: #182a33;
  text-decoration: none;
  padding: 0.5rem;
  &.active {
    background: #54f1eb;
    border-color: #182a33;
    color: #182a33;
  }
  @media (min-width: 768px) {
    color: white;
    text-decoration: none;
  }
`;

export const MainNavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover ${MainNavigationListItemsLink} {
    background: #54f1eb;
    border-color: #182a33;
    color: #182a33;
  }
  &:active ${MainNavigationListItemsLink} {
    background: #54f1eb;
    border-color: #182a33;
    color: #182a33;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const MainNavigationListItems = styled.li`
  margin: 1rem;
  @media (min-width: 768px) {
    margin: 0 0.5rem;
  }
`;

export const DnDContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const ColumnTitle = styled.h3`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#777" : "#fff")};
  color: ${(props) => (props.isDragging ? "#fff" : "#182a33")};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#182a33" : "#fff")};
  flex-grow: 1;
  min-height: 100px;
`;

export const TaskTitle = styled.h4`
  margin: auto;
`;

export const TaskContent = styled.p`
  margin: 2px;
  text-align: center;
`;

export const TaskEstimatedTime = styled.p`
  margin: 2px;
`;

export const TaskPriority = styled.p`
  margin: 2px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  height: 300px;
  justify-content: space-evenly;
`;

export const CreateColumnTitle = styled.h1`
  color: #182a33;
`;

export const Input = styled.input`
  width: ${(props) => (props.full ? "100%" : "50%")};
  font: inherit;
  border: 1px solid #ccc;
  background: #f8f8f8;
  padding: 0.15rem 0.25rem;
  &:focus {
    outline: none;
    background: #ebebeb;
    border-color: #182a33;
  }
`;

export const SubmitButton = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #182a33;
  border-radius: 4px;
  background: #182a33;
  color: white;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background: #54f1eb;
    border-color: #54f1eb;
    color: #182a33;
  }
  &:active {
    background: #54f1eb;
    border-color: #54f1eb;
    color: #182a33;
  }
  &:focus {
    outline: none;
  }
`;

export const FunctionButtonsContainer = styled.div`
  text-align: center;
`;

export const FunctionButtonsInnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const FunctionButton = styled.button`
  font: inherit;
  height: 40px;
  margin: 2px;
  padding: 0.5rem 1.5rem;
  border: 1px solid #182a33;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? "#ccc" : "#182a33")};
  color: ${(props) => (props.disabled ? "#182a33" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-decoration: none;
  display: inline-block;
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#54f1eb")};
    border-color: #54f1eb;
    color: #182a33;
  }
  &:active {
    background: #54f1eb;
    border-color: #54f1eb;
    color: #182a33;
  }
  &:focus {
    outline: none;
  }
`;
