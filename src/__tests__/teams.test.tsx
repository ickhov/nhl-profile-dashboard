import { cleanup, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Teams } from "../pages";

const teams = {
  teams: [
    {
      id: 1,
      name: "New Jersey Devils",
      link: "/api/v1/teams/1",
      venue: {
        name: "Prudential Center",
        link: "/api/v1/venues/null",
        city: "Newark",
        timeZone: {
          id: "America/New_York",
          offset: -4,
          tz: "EDT",
        },
      },
      abbreviation: "NJD",
      teamName: "Devils",
      locationName: "New Jersey",
      firstYearOfPlay: "1982",
      division: {
        id: 18,
        name: "Metropolitan",
        nameShort: "Metro",
        link: "/api/v1/divisions/18",
        abbreviation: "M",
      },
      conference: {
        id: 6,
        name: "Eastern",
        link: "/api/v1/conferences/6",
      },
      franchise: {
        franchiseId: 23,
        teamName: "Devils",
        link: "/api/v1/franchises/23",
      },
    },
  ],
};

jest.mock("axios");

describe("<Teams />", () => {
  afterEach(cleanup);
  (axios.get as jest.Mock).mockResolvedValue({ data: { ...teams } });
  it("should have a team search", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByRole("teams-team-search")).toBeTruthy();
    });
  });
  it("should have a team search", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await waitFor(() => {
      expect(screen.getByRole("teams-table")).toBeTruthy();
    });
  });
});
