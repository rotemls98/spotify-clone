import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import {renderHook, act as actHook} from '@testing-library/react-hooks'
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";
import spotifyApi from "./api";
import { accessUrl } from "./spotifyConfig";
import { useLogin } from "./useLogin";
import { renderWithRouter } from "./testUtils/testUtils";

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

spotifyApi.setAccessToken = jest.fn();

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

const oldWindowLocation = window.location;

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
      replace: {
        configurable: true,
        value: jest.fn(),
      }
    }
  );
});

beforeEach(() => {
  spotifyApi.getMe.mockClear();
  spotifyApi.setAccessToken.mockClear();
  window.localStorage.removeItem("token");
  window.location.assign.mockClear();
});

afterAll(() => {
  window.location = oldWindowLocation;
});

test("on first visit show login page", () => {
  const { history } = renderWithRouter(<App />);
  expect(history.location.pathname).toEqual("/login");

  const login = screen.getByRole("button", { name: /התחברות/i });
  expect(login).toBeInTheDocument();
});

test("after user authorize the app log to main page and store token", async () => {
  renderWithRouter(<App />, {
    route: "/#access_token=secret&token_type=Bearer&expires_in=3600",
  });

  expect(screen.getByTestId("login-busy")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByTestId("login-busy"));

  expect(spotifyApi.setAccessToken).toHaveBeenCalledWith("secret");
  expect(spotifyApi.getMe).toHaveBeenCalled();

  const app = screen.getByTestId("main-app");
  expect(app).toBeInTheDocument();

  const { token } = JSON.parse(localStorage.getItem("token"));
  expect(token).toEqual("secret");
});

test("if user deny access show login page with error", () => {
  const { history } = renderWithRouter(<App />, {
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

  renderWithRouter(<App />);

  expect(screen.getByTestId("login-busy")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByTestId("login-busy"));

  expect(spotifyApi.setAccessToken).toHaveBeenCalledWith("secret");
  expect(spotifyApi.getMe).toHaveBeenCalled();

  const app = screen.getByTestId("main-app");
  expect(app).toBeInTheDocument();
});

test("on second visit if token expired - clear token and go to spotify url", () => {
  const dateMinusTwoHours = Date.now() - 3600 * 2000;
  window.localStorage.setItem(
    "token",
    JSON.stringify({
      token: "secret",
      expires: dateMinusTwoHours,
    })
  );

  renderWithRouter(<App />);

  expect(screen.getByTestId("login-busy")).toBeInTheDocument();

  expect(window.localStorage.getItem("token")).toEqual(null);
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

  renderWithRouter(<App />);

  expect(screen.getByTestId("login-busy")).toBeInTheDocument();

  await act(() => promise.catch(() => {}));

  expect(window.localStorage.getItem("token")).toEqual(null);
  expect(window.location.assign).toHaveBeenCalledWith(accessUrl);
});


test('when disconnect go to login page and clear token', () => {
  const datePlusHalfHour = Date.now() + 3600 * 500;
  window.localStorage.setItem(
    "token",
    JSON.stringify({
      token: "secret",
      expires: datePlusHalfHour,
    })
  );

  const history = createMemoryHistory({ initialEntries: ['/'] })
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );

  const { result, waitForNextUpdate } = renderHook(() => useLogin(), {wrapper: Wrapper});

  actHook(() => {
    result.current.disconnect();
  });
  
  expect(window.localStorage.getItem("token")).toEqual(null);
  expect(window.location.replace).toHaveBeenCalledWith(`${window.location.origin}/login`);

  waitForNextUpdate(); // avoid act warning
})