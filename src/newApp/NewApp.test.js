import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import NewApp from "./NewApp";
import spotifyApi from "../api";
import { accessUrl } from "../spotifyConfig";

spotifyApi.getMe = jest.fn().mockResolvedValue({
  country: "IL",
  display_name: "Rotemls",
  email: "rotemls98@gmail.com",
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: "https://open.spotify.com/user/3k5qx9rbptulw9uso8vzxpjko",
  },
  followers: {
    href: null,
    total: 1,
  },
  href: "https://api.spotify.com/v1/users/3k5qx9rbptulw9uso8vzxpjko",
  id: "3k5qx9rbptulw9uso8vzxpjko",
  images: [
    {
      height: null,
      url: "https://i.scdn.co/image/ab6775700000ee85ab0a3b4f9b40d5fa5d04116c",
      width: null,
    },
  ],
  product: "premium",
  type: "user",
  uri: "spotify:user:3k5qx9rbptulw9uso8vzxpjko",
});

window.localStorage = window.sessionStorage = {
  getItem: function (key) {
    const value = this[key];
    return typeof value === "undefined" ? null : value;
  },
  setItem: function (key, value) {
    this[key] = value;
  },
  removeItem: function (key) {
    return delete this[key];
  },
};

function renderWithRouter(
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

const oldWindowLocation = window.location;

const loginText = "התחברות";

beforeAll(() => {
  delete window.location;

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    }
  );
});

beforeEach(() => {
  window.localStorage.removeItem("token");
  window.location.assign.mockClear();
});

afterAll(() => {
  window.location = oldWindowLocation;
});

test("on first visit show login page", () => {
  const { history } = renderWithRouter(<NewApp />);
  expect(history.location.pathname).toEqual("/login");

  const login = screen.getByText(loginText);
  expect(login).toBeInTheDocument();
});

test("after user authorize the app log to main page and store token", async () => {
  renderWithRouter(<NewApp />, {
    route: "/#access_token=mysecret&token_type=Bearer&expires_in=3600",
  });

  expect(screen.getByText("loading")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("loading"));

  const app = screen.getByTestId("main-app");
  expect(app).toBeInTheDocument();

  const { token } = JSON.parse(localStorage.getItem("token"));
  expect(token).toEqual("mysecret");
});

test("if user deny access show login page with error", () => {
  const { history } = renderWithRouter(<NewApp />, {
    route: "/?error=access_denied",
  });

  expect(history.location.pathname).toEqual("/login");
  expect(screen.getByTestId("error-login")).toBeInTheDocument();
});

test("on second visit if token valid login", async () => {
  const datePlusHalfHour = Date.now() + 3600 * 500;
  window.localStorage.setItem(
    "token",
    JSON.stringify({
      token: "secret",
      expires: datePlusHalfHour,
    })
  );

  renderWithRouter(<NewApp />);

  expect(screen.getByText("loading")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("loading"));

  const app = screen.getByTestId("main-app");
  expect(app).toBeInTheDocument();
});

test("on second visit if token expired go to spotify url", () => {
  const dateMinusTwoHours = Date.now() - 3600 * 2000;
  window.localStorage.setItem(
    "token",
    JSON.stringify({
      token: "secret",
      expires: dateMinusTwoHours,
    })
  );

  renderWithRouter(<NewApp />);

  expect(screen.getByText("loading")).toBeInTheDocument();
  expect(window.location.assign).toHaveBeenCalledWith(accessUrl);
});

test("if token not valid clear token and then go to spotify url", async () => {
  const promise = Promise.reject({ status: 401 });
  spotifyApi.getMe.mockImplementationOnce(() => promise);
  const datePlusHalfHour = Date.now() + 3600 * 500;
  window.localStorage.setItem(
    "token",
    JSON.stringify({
      token: "secret",
      expires: datePlusHalfHour,
    })
  );

  renderWithRouter(<NewApp />);

  expect(screen.getByText("loading")).toBeInTheDocument();

  await act(() => promise.catch(() => {}));

  expect(JSON.parse(window.localStorage.getItem("token"))).toEqual("");
  expect(window.location.assign).toHaveBeenCalledWith(accessUrl);
});
