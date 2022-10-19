import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../pages";

describe("<Navigation />", () => {
  afterEach(cleanup);
  it("should have a title with text 'NHL Dashboard'", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("app-bar-title")).toHaveTextContent(
      "NHL Dashboard"
    );
  });
  it('should have a "Home" menu link', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("app-bar-link-home-web-view")).toHaveTextContent(
      "Home"
    );
  });
  it('should have a "Teams" menu link', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("app-bar-link-teams-web-view")).toHaveTextContent(
      "Teams"
    );
  });
});
