import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import Login from "./app/login/Login";
import { BrowserRouter } from "react-router-dom";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const renderWithRouter = () => {};

test("if token does not exist show login page", () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const connectButton = getByText("התחברות");
  expect(connectButton).toBeInTheDocument();
});

// test("if token valid login and show the app", () => {
//   window.localStorage.setItem("token", JSON.stringify("valid token"));
// });

// test("when loggin Pressed navigate to spotify", () => {
//   window.location.replace = jest.fn();
//   const { getByText } = render(<Login />);

//   fireEvent.click(getByText("התחברות"));

//   expect(window.location.replace.mock.calls[0][0]).toMatch(
//     "https://accounts.spotify.com"
//   );

//   window.location.replace.mockClear();
// });
