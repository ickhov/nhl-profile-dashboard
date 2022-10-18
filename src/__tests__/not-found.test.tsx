import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages";

describe("<NotFound />", () => {
  afterEach(cleanup);
  it("should have an image", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("404-not-found-logo")).toBeTruthy();
  });
  it("should have a message", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByRole("404-not-found-message")).toHaveTextContent(
      "Oops! We could not find the page that you're looking for."
    );
  });
  it('should have a "Back to Home" button', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("404-not-found-back-to-home-button")
    ).toHaveTextContent("Back to Home");
  });
});
