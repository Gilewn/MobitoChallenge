import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createColumn } from "../../shared/colums-http-service";
import {
  InputContainer,
  CreateColumnTitle,
  Input,
  SubmitButton,
  ErrorMessage,
} from "../../shared/styled-stylesheet";

const CreateColumn = () => {
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const createColumnHandler = () => {
    if (title === "") {
      setIsValid(false);
      return;
    }
    createColumn(title).then((res) => {
      history.push({ pathname: "/", state: res.data });
    });
  };

  return (
    <InputContainer>
      <CreateColumnTitle>
        Please enter the title of the new column
      </CreateColumnTitle>
      {!isValid && <ErrorMessage>Please enter a title</ErrorMessage>}
      <Input
        id="create-column"
        name="createColumn"
        type="text"
        placeholder="Please enter title"
        value={title}
        onChange={changeTitleHandler}
      />
      <SubmitButton onClick={createColumnHandler}>CREATE</SubmitButton>
    </InputContainer>
  );
};

export default CreateColumn;
