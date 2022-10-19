import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TeamProfileRoster } from "../pages";

const roster = [
  {
    person: {
      id: 8473541,
      fullName: "Jonathan Bernier",
      link: "/api/v1/people/8473541",
    },
    jerseyNumber: "45",
    position: {
      code: "G",
      name: "Goalie",
      type: "Goalie",
      abbreviation: "G",
    },
  },
];

describe("<TeamProfileRoster />", () => {
  afterEach(cleanup);
  it("should have a player search", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<TeamProfileRoster tab={1} index={1} data={roster} />}
          />
        </Routes>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("player-profile-roster-player-search")
    ).toBeTruthy();
  });
  it("should display the player's profile picture", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<TeamProfileRoster tab={1} index={1} data={roster} />}
          />
        </Routes>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("player-profile-roster-player-8473541-image")
    ).toBeTruthy();
  });
  it("should display the player's name", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<TeamProfileRoster tab={1} index={1} data={roster} />}
          />
        </Routes>
      </BrowserRouter>
    );
    expect(
      screen.getByRole("player-profile-roster-player-8473541-full-name")
    ).toHaveTextContent("Jonathan Bernier");
  });
});
