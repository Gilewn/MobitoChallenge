import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { createColumn } from "../../shared/colums-http-service";
import {
  InputContainer,
  CreateColumnTitle,
  Input,
  SubmitButton,
} from "../../shared/styled-stylesheet";

const CreateColumn = () => {
  const [title, setTitle] = useState("");
  const history = useHistory();

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const createColumnHandler = () => {
    createColumn(title).then((res) => {
      history.push({ pathname: "/", state: res.data });
    });
  };

  return (
    <InputContainer>
      <CreateColumnTitle>
        Please enter the title of the new column
      </CreateColumnTitle>
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
