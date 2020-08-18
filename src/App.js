import React from "react";
import { render } from "react-dom";
import SearchForm from "./SearchForm";

const App = () => {
  return (
    <>
      <SearchForm path="/" />
    </>
  );
};

render(<App />, document.getElementById("root"));
