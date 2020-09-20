import React from "react";
import { screen } from "@testing-library/react";
import PlaylistHeader from "./PlaylistHeader";
import { renderWithRouter } from "../../../../../testUtils/testUtils";

test("should render playlist information", () => {
  const owner = { display_name: "rotem", id: "1" };
  const images = [{ url: "http://localhost/src" }];
  renderWithRouter(
    <PlaylistHeader name={"Linkin Park"} owner={owner} images={images} />
  );

  expect(screen.getByText(/Linkin Park/i)).toBeInTheDocument();

  const ownerLink = screen.getByRole("link", { name: /rotem/i });
  expect(ownerLink).toBeInTheDocument();
  expect(ownerLink.href).toMatch(/user\/1$/);

  const image = screen.getByAltText("playlist");
  expect(image).toBeInTheDocument();
  expect(image.src).toEqual("http://localhost/src");
});

test("should render music logo when no image provided", () => {
  const owner = { display_name: "rotem", id: "1" };
  const images = [];
  renderWithRouter(
    <PlaylistHeader name={"Linkin Park"} owner={owner} images={images} />
  );

  const image = screen.queryByAltText("playlist-image");
  expect(image).not.toBeInTheDocument();

  const logo = screen.getByTestId("playlist-logo");
  expect(logo).toBeInTheDocument();
});
