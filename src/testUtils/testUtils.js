import React from "react";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";

export function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
