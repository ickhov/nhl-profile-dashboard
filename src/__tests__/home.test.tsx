import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { Home } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

afterEach(cleanup);

describe("<Home />", () => {
  it("should load a welcome message", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole("home-welcome-message")).toHaveTextContent(
        "Welcome"
      );
    });
  });
  it("should load a welcome message", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("home-view-teams-button")).toHaveTextContent(
      "View Teams"
    );
  });
});
