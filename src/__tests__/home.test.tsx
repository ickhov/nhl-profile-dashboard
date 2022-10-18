import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages";

describe("<Home />", () => {
  afterEach(cleanup);
  it("should have a welcome message", async () => {
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
  it('should have a "View Team" button', async () => {
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
